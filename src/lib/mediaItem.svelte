<script lang="ts">
    export let item: any;
    export let pos: any;
    
    // DESTRUCTURE ITEM
    let id: string = item["id"];
    let title: string = item["title"];
    let link: string = item["link"];
    let current_episode: number = item["current_episode"];
    let total_episodes: number = item["total_episodes"];
    let rating: number = item["rating"];
    let description: string = item["description"];
</script>

<style>

    .media-item-container {
        height: 30px;
        display: grid;
        grid-template-columns: minmax(200px, 500px) 100px 100px 100px;
        border-bottom: 1px solid var(--foreground-color);
        align-items: center;
    }

    .pos-1 {
        background-color: var(--background-color);
    }
    .pos-2 {
        background-color: var(--background-color-disabled);
    }

    .media-item {
        padding-left: 8px;
        margin: 0px;
    }
    .media-item-border {
        border-right: 1px solid var(--foreground-color);
    }
    .media-item-progress {
        padding-left: 0px;
        justify-self: center;
    }

</style>

<div class="media-item-container {pos % 2 == 0 ? "pos-1" : "pos-2"}">
    <div class="media-item media-item-border">
        {item["title"]}
    </div>
    <div class="media-item media-item-border">
        {item["rating"] ? item["rating"] : "-"}
    </div>
    <div class="media-item media-item-border">
        {item["rating"] ? item["rating"] : "-"}
    </div>
    <div class="media-item media-item-progress">
        {item["current_episode"]} / {item["total_episodes"] ? item["total_episodes"] : "-"}
    </div>
</div>