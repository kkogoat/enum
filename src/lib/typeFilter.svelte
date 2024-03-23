<script lang="ts">
    let types: Array<string> = [
        "Anime", "Cartoon", "C-Drama", "J-Drama", "K-Drama", "Manga", "Manhwa", "Manhua"
    ]
    let typeBitMap: any = {};

    // TYPES FILTER
	import { filterContext } from "./context/filterContext";
    function toggleBitMap(type: string) {
        if(typeBitMap[type]) {
            delete(typeBitMap[type]);
        } else {
            typeBitMap[type] = 1;
        }
        filterContext.type(typeBitMap);
    }

    // RESET
    function handleReset() {
        typeBitMap = {}
        filterContext.type(typeBitMap);
        for (let step = 0; step < types.length; step++) {
            (document.getElementById(types[step]) as HTMLInputElement).checked = false;
        }
    }
</script>

<style>
    .type-filter-container {
        display: flex;
        gap: 5px;
    }
    button {
        border-radius: unset;
    }
    label {
        padding: 5px;
        user-select: none;
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

<div class="type-filter-container">
    {#each types as item, index}
        <div>
            <input id={item} name={item} type="checkbox" on:change={() => toggleBitMap(item)}/>
            <label for={item}>{item}</label>
        </div>
    {/each}
    <button on:click={handleReset}>reset</button>
</div>