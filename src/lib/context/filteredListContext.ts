import { derived } from "svelte/store";
import { listContext } from "./listContext";
import { filterContext } from "./filterContext";

export const filteredListContext = derived([listContext, filterContext], ([$listContext, $filterContext]) => {
    let result: any = $listContext;

    // SEARCH FILTER
    if($filterContext.search) {
        result = result.filter((item: any) => item.title.toLowerCase().includes($filterContext.search.toLowerCase()));
    }

    // ALPHABETICAL FILTER
    if($filterContext.alpha && Object.keys($filterContext.alpha).length) {
        result = result.filter((item: any) => {
            const first = item.title[0].toUpperCase()
            return (first >= '0' && first <= '9') ? $filterContext.alpha['#'] : $filterContext.alpha[first];
        });
    }

    // TYPE FILTER
    if($filterContext.type && Object.keys($filterContext.type).length) {
        result = result.filter((item: any) => $filterContext.type[item.type]);
    }

    // STATUS FILTER
    if($filterContext.status && Object.keys($filterContext.status).length) {
        result = result.filter((item: any) => $filterContext.status[item.status]);
    }

    // COLUMN SORTS
    if($filterContext.sort && Object.keys($filterContext.sort).length) {
        let key = Object.keys($filterContext.sort)[0];
        let value = $filterContext.sort[key];
        let t = 1, f = -1; // t = true value, f = false value
        if(value) { t = -1, f = 1}; // inverse of t & f
        if(key === "title") {
            f = [t, t = f][0]; // swapping t & f values
            result.sort((a: any, b: any) => { return a["title"] > b["title"] ? t : f; });
        } else if(key === "current_episode") {
            result.sort((a: any, b: any) => {
                if(a[key] === 0 || a[key] === null) return 1;
                if(b[key] === 0 || b[key] === null) return -1;
                if(value) return b[key] - a[key];
                else return a[key] - b[key];
            });
        } else {
            result.sort((a: any, b: any) => {
                if(a[key] === null) return 1;
                if(b[key] === null) return -1;
                if(value) return b[key] - a[key];
                else return a[key] - b[key];
            });
        }
    } else {
        result.sort((a: any, b: any) => {
            return a["title"] > b["title"] ? 1 : -1;
        });
    }

    return result;
});