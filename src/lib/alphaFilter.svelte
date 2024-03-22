<script lang="ts">
    let charMap: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let alphaBitMap: any = {};

	import { filterContext } from "./context/filterContext";
    let timer: any;
    function toggleBitMap(index: string) {
        if(alphaBitMap[index]) {
            delete(alphaBitMap[index])
        } else {
            alphaBitMap[index] = 1;
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            filterContext.alpha(alphaBitMap);
        }, 300)
    }

    // RESET
    function handleReset() {
        alphaBitMap = {}
        filterContext.alpha(alphaBitMap);
        for (let step = 0; step <= 25; step++) {
            (document.getElementById(charMap[step]) as HTMLInputElement).checked = false;
        }
    }
</script>

<style>
    .alpha-filter-container {
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
    }
    input[type="checkbox"]:checked + label {
        background-color: var(--accent-color);
        color: var(--text-color);
    }
</style>

<div class="alpha-filter-container">
    {#each {length: 26} as _, i}
        <div>
            <input on:change={() => toggleBitMap(charMap[i])} id={charMap[i]} name={charMap[i]} type="checkbox" />
            <label for={charMap[i]}>{charMap[i]}</label>
        </div>
    {/each}
    <button on:click={handleReset}>reset</button>
</div>