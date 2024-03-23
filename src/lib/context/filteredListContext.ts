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
        result = result.filter((item: any) => $filterContext.alpha[item.title[0].toUpperCase()]);
    }

    // TYPE FILTER
    if($filterContext.type && Object.keys($filterContext.type).length) {
        result = result.filter((item: any) => $filterContext.type[item.type]);
    }

    // COLUMN SORTS
    if($filterContext.sort && Object.keys($filterContext.sort).length) {
        let key = Object.keys($filterContext.sort)[0];
        let value = $filterContext.sort[key];
        let t = 1, f = -1;
        if(value) { t = -1, f = 1};
        if(key == "title") {f = [t, t = f][0]};
        result.sort((a: any, b: any) => {
            return a[key] > b[key] ? t : f;
        });
    } else {
        result.sort((a: any, b: any) => {
            return a["title"] > b["title"] ? 1 : -1;
        });
    }

    return result;
});