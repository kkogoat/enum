import { derived } from "svelte/store";
import { listContext } from "./listContext";
import { filterContext } from "./filterContext";

export const filteredListContext = derived([listContext, filterContext], ([$listContext, $filterContext]) => {
    let result: any = $listContext;

    if($filterContext.search) {
        result = result.filter((item: any) => item.title.toLowerCase().startsWith($filterContext.search.toLowerCase()));
    }

    return result;
});