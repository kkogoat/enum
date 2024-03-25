import { writable } from "svelte/store";

function createListContext(list: any) {
    const { subscribe, set, update } = writable(list);

    // onMount LIST SET
    function initializeList(list: any) {
        set(list);
    }

    // Client-side LIST ADD
    function addToList(item: any) {
        update((items) => {
            items.push(item);
            return items;
        })
    }

    // Client-side LIST REMOVE
    function removeFromList(id: string) {
        update((items) => {
            let result = items.filter((item: any) => {return item.id != id});
            return result;
        })
    }

    return { subscribe, initializeList, removeFromList, addToList }
}

export const listContext = createListContext([]);