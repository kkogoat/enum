import { writable } from "svelte/store";

function createListContext(list: any) {
    const { subscribe, set } = writable(list);

    function initializeList(list: any) {
        set(list);
    }

    return { subscribe, initializeList }
}

export const listContext = createListContext([]);