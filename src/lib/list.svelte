<script lang="ts">
	import MediaItem from "./mediaItem.svelte";

    import { filteredListContext } from "$lib/context/filteredListContext";
</script>

<style>
    .list-container {
        margin-top: 275px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .list-labels-container {
        height: 27px;
        position: fixed;
        background-color: var(--background-color);
        display: grid;
        grid-template-columns: minmax(200px, 500px) 50px 85px 100px 120px;
    }

    .list-labels-item {
        padding: 0px 0px 2px 8px;
        border-bottom: 1px solid var(--foreground-color);
        user-select: none;
    }
    .list-labels-item-border {
        border-right: 1px solid var(--foreground-color);
    }

    .list-items {
        margin-top: 27px;
    }
</style>

<div class="list-container">
    <div class="list-labels-container">
        <div class="list-labels-item list-labels-item-border">
            Title
        </div>
        <div class="list-labels-item list-labels-item-border">
            Link
        </div>
        <div class="list-labels-item list-labels-item-border">
            Rating
        </div>
        <div class="list-labels-item list-labels-item-border">
            Type
        </div>
        <div class="list-labels-item">
            Progress
        </div>
    </div>

    <div class="list-items">
        {#each $filteredListContext as item, index (item.id)}
            <MediaItem item={item} pos={index}/>
        {/each}
    </div>    
    <div style="height: 300px" />
</div>
