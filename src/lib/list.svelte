<script lang="ts">
	import MediaItem from "./mediaItem.svelte";

    export let list: any = [];
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
        grid-template-columns: minmax(200px, 500px) 100px 100px 100px;
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
        {#each list as item, index}
            <MediaItem item={item} pos={index}/>
        {/each}
    </div>    
</div>
