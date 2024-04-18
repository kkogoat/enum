import { writable } from "svelte/store";

function createFilterContext(filters: any) {
    const { subscribe, update } = writable(filters);

    // SEARCH FILTER
    function search(input: string) {
        update((filters) => {
            filters.search = input;
            return filters;
        });
    }

    // ALPHABETICAL FILTER
    function alpha(input: any) {
        update((filters) => {
            filters.alpha =  input;
            return filters;
        });
    }

    // TYPES FILTER
    function type(input: any) {
        update((filters) => {
            filters.type = input;
            return filters;
        });
    }

    // STATUS FITLER
    function status(input: any) {
        update((filters) => {
            filters.status = input;
            return filters;
        });
    }
    
    // SORTING OPTIONS
    function sort(input: any) {
        update((filters) => {
            filters.sort = input;
            return filters;
        });
    }

    return { subscribe, search, alpha, type, status, sort }
}

export const filterContext = createFilterContext({});