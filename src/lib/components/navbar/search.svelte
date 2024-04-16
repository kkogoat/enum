<script lang="ts">
    import { filterContext } from "$lib/context/filterContext";

    let toSearch: string = "";

    $: toSearch, filterContext.search(toSearch);
</script>

<style>
    .search-input {
        background-color: var(--foreground-color);
        margin-right: 5px;
        border-radius: 50px;
        width: 450px;
    }
    @media (min-width: 320px) and (pointer: coarse) {
        .search-input {
            width: 350px;
        }
    }
    @media (min-width: 600px) and (pointer: coarse) {
        .search-input {
            width: 450px;
        }
    }
    @media (min-width: 960px) and (pointer: coarse) {
        .search-input {
            width: 450px;
        }
    }
</style>

<input class="search-input" placeholder="サーチ" type="text" bind:value={toSearch} />