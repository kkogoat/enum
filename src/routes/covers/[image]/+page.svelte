<script lang="ts">
    /** @type {import('./$types').PageData} */
    import { onMount } from "svelte";
    export let data: any;
    let imgsrc: any;
    onMount(async () => {
        const result = await fetch(`/covers/${data.image}`, {
            method: "GET"
        });
        if(result.ok) {
            imgsrc = URL.createObjectURL(await result.blob());
        } else {
            window.location.replace('/');
        }
    })
</script>

<style>
    .center {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image {
        max-height: 90vh;
    }
</style>

<div class="center">
    <img class="image" src={imgsrc} alt="Cover"/>
</div>