<script lang="ts">
    import { authContext } from "$lib/context/authContext";
	import AddModal from "$lib/addModal.svelte";
	import Search from "$lib/search.svelte";
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
    }

    .search-container {
        display: flex;
        margin-left: 35px;
        margin-bottom: 10px;
    }   

    .filter-container {
        width: 600px;
        height: 60px;
    }
</style>

<button class="logout-button" on:click={authContext.logout}>ログアウト</button>

<nav>
    <div class="search-container">
        <Search />
        <AddModal />
    </div>
    <div class="filter-container">

    </div>
</nav>