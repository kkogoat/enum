<script lang="ts">
    import { PUBLIC_ALLOWED_TYPES, PUBLIC_ALLOWED_TYPES_DELIMITER } from "$env/static/public";
    import { listContext } from "$lib/context/listContext";
    let types = PUBLIC_ALLOWED_TYPES.split(PUBLIC_ALLOWED_TYPES_DELIMITER)
    let stats = ["Total Media", "Total Episodes", "Average Rating", ...types];
    let vars: any = new Array(3);

    // Analytics
    $: if($listContext.length) {
        vars[0] = $listContext.length; // Total Media
        vars[1] = $listContext.reduce((a: any, b: any) => a + b.current_episode, 0); // Total Episodes
        vars[2] = Math.round(($listContext.reduce((a: any, b: any) => a + b.rating, 0) / vars[0]) * 10) / 10; // Average Rating
        for(let i = 0; i < types.length; i++) { // Types count
            vars[i+3] = $listContext.reduce((a: any, b: any) => a + (b.type == types[i] ? 1 : 0), 0);
        }
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