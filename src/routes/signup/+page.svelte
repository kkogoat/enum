<script lang="ts">
    import { PUBLIC_ALLOW_NEW_ACC } from "$env/static/public";
	import Signup from "$lib/components/signup/signup.svelte";
	import ThemeToggle from "$lib/components/theme/themeToggle.svelte";
	import { onMount } from "svelte";

    // REDIRECT ON FALSE
    onMount(() => {
        if(PUBLIC_ALLOW_NEW_ACC == "false") {
            window.location.replace("/");
        }
    })
</script>

{#if PUBLIC_ALLOW_NEW_ACC == "true"}
    <ThemeToggle />
    <Signup />
{/if}