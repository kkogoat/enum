<script lang="ts">
    import { authContext } from "$lib/context/authContext";
	import AddModal from "$lib/addModal.svelte";
	import Search from "$lib/search.svelte";
	import AlphaFilter from "$lib/alphaFilter.svelte";
	import TypeFilter from "$lib/typeFilter.svelte";
</script>

<style>
    .logout-button {
        width: 85px;
        height: 30px;
        border-radius: 50px;
        position: fixed;
        top: 55px;
        right: 15px;
        z-index: 999;
    }

    nav {
        position: fixed;
        background-color: var(--background-color);
        top: 0px;
        width: 100%;
        height: 260px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        padding-bottom: 15px;
        transition: background-color var(--color-animation-timing) ease;
    }

    .title {
        font-size: 40px;
        margin-bottom: 50px;
        transition: color var(--color-animation-timing) ease;
    }

    .search-container {
        display: flex;
        margin-left: 35px;
        margin-bottom: 20px;
    }   

    .filter-container {
        margin-bottom: 0px;
    }
</style>

<button class="logout-button" on:click={authContext.logout}>ログアウト</button>

<nav>
    <div class="title"> enum.usagi </div>
    <div class="search-container">
        <Search />
        <AddModal />
    </div>
    <div class="filter-container">
        <AlphaFilter />
        <TypeFilter />
    </div>
</nav>