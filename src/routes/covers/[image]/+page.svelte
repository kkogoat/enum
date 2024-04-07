<script lang="ts">
	import { onMount } from "svelte";

    /** @type {import('./$types').PageData} */
    export let data: any;
</script>

<style>
    .center {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div class="center">
    <img src={data.image} alt="Cover Does Not Exist"/>
</div>