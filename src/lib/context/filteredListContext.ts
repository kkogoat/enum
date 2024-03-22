import { derived } from "svelte/store";
import { listContext } from "./listContext";
import { filterContext } from "./filterContext";

export const filteredListContext = derived([listContext, filterContext], ([$listContext, $filterContext]) => {
    let result: any = $listContext;

    if($filterContext.search) {
        result = result.filter((item: any) => item.title.toLowerCase().includes($filterContext.search.toLowerCase()));
    }

    if($filterContext.alpha && Object.keys($filterContext.alpha).length) {
        result = result.filter((item: any) => $filterContext.alpha[item.title[0].toUpperCase()]);
    }

    if($filterContext.type && Object.keys($filterContext.type).length) {
        result = result.filter((item: any) => $filterContext.type[item.type]);
    }

    return result;
});