<script lang="ts">
    export let select: string;
    let options = ["analytics"];

    // NAV SELECT
    function handleSelect(option: string) {
        select = option;
    }
</script>

<style>
    .nav-container {
        display: flex;
        flex-direction: column;
        border-right: 2px solid var(--accent-color-disabled);
        margin-right: 7px;
    }

    .button {
        padding: 3px 7px 3px 0px;
        cursor: pointer;
        text-align: right;
    }

    .button:hover {
        color: var(--accent-color);
        transition: var(--color-animation-timing);
    }

    .selected {
        color: var(--accent-color);
    }
</style>

<div class="nav-container">
    {#each options as option}
        <div class="button {select == option ? "selected" : ""}" on:click={() => handleSelect(option)} aria-hidden="true">
            {option}
        </div>
    {/each}
</div>