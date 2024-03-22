import { writable } from "svelte/store";

function createFilterContext(filters: any) {
    const { subscribe, update } = writable(filters);

    function search(input: string) {
        update((filters) => {
            filters.search = input;
            return filters;
        })
    }
    function alpha(input: any) {
        update((filters) => {
            filters.alpha =  input;
            return filters;
        })
    }

    return { subscribe, search, alpha }
}

export const filterContext = createFilterContext({});