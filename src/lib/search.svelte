<script lang="ts">
    import { filterContext } from "$lib/context/filterContext";

    let toSearch: string = "";

    $: toSearch, handleSearch();
    let timer: any;
    function handleSearch() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            filterContext.search(toSearch);
        }, 800);
    }
</script>

<style>
    .search-input {
        background-color: var(--foreground-color);
        margin-right: 5px;
        border-radius: 50px;
        width: 450px;
    }
</style>

<input class="search-input" placeholder="サーチ" type="text" bind:value={toSearch} />