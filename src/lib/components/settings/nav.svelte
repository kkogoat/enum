<script lang="ts">
    export let dialogClose: any;
    export let select: string;
    export let options: any;

    // NAV SELECT
    function handleSelect(option: string) {
        select = option;
    }
</script>

<style>
    .nav-container {
        min-height: 150px;
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

    .close-button {
        padding: 5px 0px 5px 0px;
        margin-right: 7px;
        color: var(--background-color-disabled-text);
        background-color: #520606;
    }
    .close-button:hover {
        background-color: #b41010;
        color: var(--text-color);
        transition: var(--color-animation-timing);
    }
    .close-button:active {
        background-color: #880c0c;
        color: var(--background-color-placeholder-text);
    }
</style>

<div class="nav-container">
    {#each options as option}
        <div class="button {select == option ? "selected" : ""}" on:click={() => handleSelect(option)} aria-hidden="true">
            {option}
        </div>
    {/each}
    <button class="close-button" on:click={dialogClose} style="margin-top: auto;">close</button>
</div>