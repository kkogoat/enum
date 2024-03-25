<script lang="ts">
    import { listContext } from "$lib/context/listContext";
    let stats = ["Total Media", "Total Episodes", "Average Rating"];
    let vars: any = new Array(3);

    // Analytics
    $: if($listContext.length) {
        vars[0] = $listContext.length;
        vars[1] = $listContext.reduce((a: any, b: any) => a + b.current_episode, 0);
        vars[2] = Math.round(($listContext.reduce((a: any, b: any) => a + b.rating, 0) / vars[0]) * 10) / 10;
    }
</script>

<style>
    .analytics-container {
        padding-top: 3px;
    }

    .float-right {
        float: right;
    }

    .pos-1 {
        background-color: var(--background-color);
    }
    .pos-2 {
        background-color: var(--foreground-color);
    }

</style>

<div class="analytics-container">
    {#each stats as stat, index}
        <div class={index % 2 ? "pos-2" : "pos-1"}>
            {stat}: <div class="float-right">{vars[index]}</div>
        </div>
    {/each}
</div>