import { customFetch } from "$lib/util/customFetchUtil";

export const addMedia = async (data: object) => {
    // FORM CREATION
    let form = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if(value) {
            form.append(key, value);
        }
    }

    const result = await customFetch.post('/api/media/add', form);
    const decoded = await (await (result as Promise<Response>)).json();

    // ERROR DETAILS
    if(decoded.details) return decoded;
    if(!decoded.instance) {
        return {details: [{message: decoded}]};
    }

    // ENTRY CONSTRUCTION
    const instance = decoded.instance;
    let entry = {
        id: instance.id,
        title: instance.title,
        link: instance.link ? instance.link : null,
        current_episode: instance.current_episode,
        total_episode: instance.total_episode ? instance.total_episode : null,
        rating: instance.rating ? instance.rating : null,
        description: instance.description ? instance.description : null,
        status: instance.status,
        type: instance.type
    }
    decoded.entry = entry;
    return decoded;
}

export const getMediaList = async () => {
    const result = await customFetch.get('/api/media/get-list');
    const list = await result.json();
    return list;
}

export const editMedia = (data: object) => {
    // FORM CREATION
    let form = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if(value) {
            form.append(key, value);
        }
    }

    const result = customFetch.put('/api/media/edit', form);
    return result;
}

export const deleteMedia = (data: object) => {
    const result = customFetch.delete('/api/media/delete', data);
    return result;
}

export const importMediaList = async (file: string) => {
    const result = customFetch.post('/api/media/import', file);
    return result;
}