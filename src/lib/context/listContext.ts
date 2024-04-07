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

    // Client-side LIST ENTRY UPDATE
    function updateIdFromList(item: any) {
        update((items) => {
            let entry = items.findIndex((obj: any) => obj.id == item.id);
            items[entry] = item;
            return items;
        });
    }

    return { subscribe, initializeList, removeFromList, addToList, updateIdFromList }
}

export const listContext = createListContext([]);