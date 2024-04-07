<script lang="ts">
    import { PUBLIC_ALLOW_NEW_ACC } from "$env/static/public";
	import Signup from "$lib/components/signup/signup.svelte";
	import ThemeToggle from "$lib/components/theme/themeToggle.svelte";
	import { authContext } from "$lib/context/authContext";
	import { onMount } from "svelte";

    // REDIRECT ON FALSE
    let loading = true;
    onMount(async () => {
        await authContext.autoLogin();
        if(PUBLIC_ALLOW_NEW_ACC == "false" || $authContext) {
            window.location.replace("/");
        } else {
            loading = false;
        }
    })
</script>

{#if PUBLIC_ALLOW_NEW_ACC == "true" && !loading}
    <ThemeToggle />
    <Signup />
{/if}