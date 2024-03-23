<script lang="ts">
    import LabelSort from "./labelSort.svelte";
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
    </div>    
    <div style="height: 300px" />
</div>
