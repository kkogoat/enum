import { customFetch } from "$lib/util/customFetchUtil";

export const addMedia = async (data: object) => {
    const result = await customFetch.post('/api/media/add', data);
    const decoded = await (await (result as Promise<Response>)).json();
    if(!decoded.instance) return null;

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
    return entry;
}

export const getMediaList = async () => {
    const result = await customFetch.get('/api/media/get-list');
    const list = await result.json();
    return list;
}

export const editMedia = (data: object) => {
    const result = customFetch.put('/api/media/edit', data);
}

export const deleteMedia = (data: object) => {
    const result = customFetch.delete('/api/media/delete', data);
}