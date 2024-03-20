import { authContext } from "$lib/authContext"
import { get } from "svelte/store"

export const addMedia = async (data: object) => {
    const result = fetch('/api/media/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${get(authContext)}`
        },
        body: JSON.stringify(data)
    }).catch((error) => {
        console.log(error);
    });

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
    const result = await fetch('/api/media/get-list',{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${get(authContext)}`
        }
    })
    const list = await result.json();
    return list;
}

export const editMedia = (data: object) => {
    fetch('/api/media/edit', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${get(authContext)}`
        },
        body: JSON.stringify(data)
    }).catch((error) => {
        console.log(error);
    });
}

export const deleteMedia = (data: object) => {
    fetch('/api/media/delete', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${get(authContext)}`
        },
        body: JSON.stringify(data)
    }).catch((error) => {
        console.log(error);
    });
}