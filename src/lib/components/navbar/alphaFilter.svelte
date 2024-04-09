<script lang="ts">
	import { PUBLIC_ALPHA_FILTER } from "$env/static/public";

    let charMap: string = PUBLIC_ALPHA_FILTER;
    let alphaBitMap: any = {};

    // ALPHA FILTER
	import { filterContext } from "$lib/context/filterContext";
    function toggleBitMap(index: string) {
        if(alphaBitMap[index]) {
            delete(alphaBitMap[index])
        } else {
            alphaBitMap[index] = 1;
        }
        filterContext.alpha(alphaBitMap);
    }

    // RESET
    function handleReset() {
        alphaBitMap = {}
        filterContext.alpha(alphaBitMap);
        for (let step = 0; step < charMap.length; step++) {
            (document.getElementById(charMap[step]) as HTMLInputElement).checked = false;
        }
    }
</script>

<style>
    .alpha-filter-container {
        display: flex;
        gap: 5px;
        margin-bottom: 17px;
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

<div class="alpha-filter-container">
    {#each {length: charMap.length} as _, i}
        <div>
            <input on:change={() => toggleBitMap(charMap[i])} id={charMap[i]} name={charMap[i]} type="checkbox" />
            <label for={charMap[i]}>{charMap[i]}</label>
        </div>
    {/each}
    <button on:click={handleReset}>reset</button>
</div>