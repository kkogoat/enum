import { authContext } from "$lib/authContext"
import { get } from "svelte/store"

export const addMedia = (data: object) => {
    fetch('/api/media/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${get(authContext)}`
        },
        body: JSON.stringify(data)
    }).catch((error) => {
        console.log(error);
    });
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