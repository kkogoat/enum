<script lang="ts">
    let statuses: Array<string> = ["In Progress", "Completed", "Planned", "Dropped"]

    // STATUSES FILTER
    let statusBitMap: any = {};
    import { filterContext } from "$lib/context/filterContext";
    function toggleBitMap(status: string) {
        if(statusBitMap[status]) {
            delete statusBitMap[status];
        } else {
            let current = Object.keys(statusBitMap);
            if(current.length) {
                (document.getElementById(current[0]) as HTMLInputElement).checked = false;
            }
            statusBitMap = {};
            statusBitMap[status] = 1;
        }
        filterContext.status(statusBitMap);
    }

    // RESET
    function handleReset() {
        statusBitMap = {}
        filterContext.status(statusBitMap);
        for (let step = 0; step < statuses.length; step++) {
            (document.getElementById(statuses[step]) as HTMLInputElement).checked = false;
        }
    }
</script>

<style>
    .status-filter-container {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
    }
    button {
        border-radius: unset;
    }
    label {
        padding: 5px;
        display: block;
        user-select: none;
    }
    @media (min-width: 600px) and (pointer: coarse) {
        label {
            padding: 4px;
            font-size: 13px;
        }
    }
    input[type="checkbox"] {
        display: none;
    }
    input[type="checkbox"] + label {
        background-color: var(--foreground-color);
        border: 1px solid var(--accent-color);
        color: var(--accent-color);
        cursor: pointer;
        transition: background-color var(--color-animation-timing) ease, color var(--color-animation-timing) ease, border var(--color-animation-timing) ease;
    }
    input[type="checkbox"]:hover + label {
        color: var(--text-color);
    }
    input[type="checkbox"]:checked + label {
        background-color: var(--accent-color);
        color: var(--text-color);
    }
</style>

<div class="status-filter-container">
    {#each statuses as item, index}
        <div>
            <input id={item} name={item} type="checkbox" on:change={() => toggleBitMap(item)}/>
            <label for={item}>{item}</label>
        </div>
    {/each}
    <button on:click={handleReset}>reset</button>
</div>