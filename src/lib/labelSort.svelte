<script lang="ts">
    import { filterContext } from "$lib/context/filterContext";
    import ArrowUp from "$lib/assets/arrow_up.svelte";
    import ArrowDown from "$lib/assets/arrow_down.svelte";

    let sortColumn:any = {};
    let sortMap:any = {"t":"title", "r":"rating", "p":"total_episodes"};
    let stage1: string, stage2: string;
    function handleSort(column: string) {
        if(stage1 == column) {
            if(stage2 == column) {
                stage1 = stage2 = "";
                delete(sortColumn[sortMap[column]]);
            } else {
                stage2 = column;
                sortColumn[sortMap[column]] = 0;
            }
        } else {
            filterContext.sort({});
            [stage1, stage2, sortColumn] = [column, "", {}];
            sortColumn[sortMap[column]] = 1;
        }
        filterContext.sort(sortColumn);
    }
</script>

<style>
    .list-labels-container {
        height: 27px;
        position: fixed;
        background-color: var(--background-color);
        display: grid;
        grid-template-columns: minmax(200px, 500px) 50px 85px 100px 120px;
        transition: background-color var(--color-animation-timing) ease, color var(--color-animation-timing) ease;
    }

    .list-labels-item {
        padding: 0px 0px 2px 8px;
        border-bottom: 1px solid var(--foreground-color);
        user-select: none;
        transition: border-bottom var(--color-animation-timing) ease, border-right var(--color-animation-timing) ease, color .5s ease;
    }

    .list-labels-item-border {
        border-right: 1px solid var(--foreground-color);
    }
    
    .can-sort {
        cursor: pointer;
    }
    .can-sort:hover {
        color: var(--accent-color);
        cursor: pointer;
    }

    .active {
        color: var(--accent-color);
    }
</style>

<div class="list-labels-container">
    <div class="list-labels-item list-labels-item-border can-sort {stage1 == "t" ? "active" : "" }" on:click={() => handleSort("t")} aria-hidden="true">
        Title
        {#if stage1 == "t" && stage2 == ""} <ArrowUp />
        {:else if stage2 == "t"} <ArrowDown />
        {/if}
    </div>
    <div class="list-labels-item list-labels-item-border">
        Link
    </div>
    <div class="list-labels-item list-labels-item-border can-sort {stage1 == "r" ? "active" : "" }" on:click={() => handleSort("r")} aria-hidden="true">
        Rating
        {#if stage1 == "r" && stage2 == ""} <ArrowUp />
        {:else if stage2 == "r"} <ArrowDown />
        {/if}
    </div>
    <div class="list-labels-item list-labels-item-border">
        Type
    </div>
    <div class="list-labels-item can-sort {stage1 == "p" ? "active" : "" }" on:click={() => handleSort("p")} aria-hidden="true">
        Progress
        {#if stage1 == "p" && stage2 == ""} <ArrowUp />
        {:else if stage2 == "p"} <ArrowDown />
        {/if}
    </div>
</div>