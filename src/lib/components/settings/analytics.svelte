<script lang="ts">
    import { PUBLIC_ALLOWED_TYPES, PUBLIC_ALLOWED_TYPES_DELIMITER } from "$env/static/public";
    import { listContext } from "$lib/context/listContext";

    // TYPES & STATS INITIALIZATION
    let types = PUBLIC_ALLOWED_TYPES.split(PUBLIC_ALLOWED_TYPES_DELIMITER);
    types.push(""); // Uncategorized Entries
    let stats = ["Total Media", "Total Episodes", "Average Rating", ...types];
    let vars: any = new Array();

    // Analytics Calculation
    $: if($listContext.length) {
        // Total Media
        vars[0] = $listContext.length; 
        // Total Episodes
        vars[1] = $listContext.reduce((a: any, b: any) => a + b.current_episode, 0);
        // Average Rating
        let total = 0, entries_with_ratings = 0;
        for(let key in $listContext) {
            if($listContext[key].rating) {
                total += $listContext[key].rating;
                entries_with_ratings += 1;
            }
        }
        vars[2] = Math.round((total / entries_with_ratings) * 10) / 10;
        // Types count
        for(let i = 0; i < types.length; i++) {
            vars[i+3] = $listContext.reduce((a: any, b: any) => a + (b.type == types[i] ? 1 : 0), 0);
        }
        stats[stats.length-1] = "Unclassified";
    } else {
        vars = new Array();
    }
</script>

<style>
    .analytics-container {
        padding-top: 3px;
        width: 300px;
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
            {stat}: <div class="float-right">{vars[index] ? vars[index] : 0}</div>
        </div>
    {/each}
</div>