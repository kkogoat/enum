<script lang="ts">
    import { authContext } from "$lib/context/authContext";
	import AddModal from "$lib/components/mediaItem/addModal.svelte";
	import Search from "./search.svelte";
	import AlphaFilter from "./alphaFilter.svelte";
	import TypeFilter from "./typeFilter.svelte";

    let dialogRef: HTMLDialogElement;
    function handleLogout() {
        dialogRef.showModal();
        setTimeout(() => {
            authContext.logout();
            dialogRef.close();
        }, 1000);
    }
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
        max-width: 60%;
    }
    @media (min-width: 320px) and (pointer: coarse) {
        .search-container {
            margin-left: 5px;
        }
        .filter-container {
            display: none;
        }
    }
    @media (min-width: 600px) and (pointer: coarse) {
        .search-container {
            margin-left: 35px;
        }
        .filter-container {
            width: 95%;
            max-width: 95%;
            display: flex;
            flex-direction: column;
        }
    }
    @media (min-width: 960px) and (pointer: coarse) {
        .search-container {
            margin-left: 35px;
        }
        .filter-container {
            width: initial;
            max-width: 95%;
        }
    }
    dialog {
        width: 0px;
        height: 0px;
        padding: 0px;
        margin: 0px;
    }
</style>

<dialog bind:this={dialogRef}></dialog>
<button class="logout-button" on:click={handleLogout}>ログアウト</button>

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