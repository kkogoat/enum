<script lang="ts">
    import LabelSort from "$lib/components/navbar/labelSort.svelte";
	import MediaItem from "$lib/components/mediaItem/mediaItem.svelte";
    import { filteredListContext } from "$lib/context/filteredListContext";
</script>

<style>
    @media (min-width: 600px) {
        .list-container {
            width: 95%;
        }
    }
    @media (min-width: 1025px) {
        .list-container {
            width: unset;
        }
    }
    .list-container {
        background-color: var(--background-color);
        transition: background-color var(--color-animation-timing) ease;
        margin-top: 275px;
        min-height: calc(100vh - 275px);
        max-height: calc(100% - 275px);
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .list-items {
        margin-top: 27px;
    }
</style>

<div class="list-container">
    <LabelSort />
    <div class="list-items">
        {#each $filteredListContext as item, index (item.id)}
            <MediaItem item={item} pos={index}/>
        {/each}
        <div style="min-height: 250px" />
    </div>    
</div>
