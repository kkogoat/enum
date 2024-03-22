import { writable } from "svelte/store";

function createFilterContext(filters: any) {
    const { subscribe, update } = writable(filters);

    function search(input: string) {
        update((filters) => {
            filters.search = input;
            return filters;
        })
    }

    return { subscribe, search }
}

export const filterContext = createFilterContext({});