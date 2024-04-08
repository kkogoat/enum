<script lang="ts">
	import { PUBLIC_DEMO } from "$env/static/public";
	import { onMount } from "svelte";
    import VisOff from "$lib/assets/visOff.svelte";
    import VisOn from "$lib/assets/visOn.svelte";

    let usernameRef: HTMLInputElement;
    let passwordRef: HTMLInputElement;
    let loginButtonRef: HTMLElement;
    let username: string;
    let password: string;
    let disable: boolean;
    let showError: boolean;
    let visible: boolean;

    onMount(() => {
        usernameRef.focus();
    });

    // PASSWORD VISIBILITY
    const handlePasswordVisibility = (event: Event) => {
        visible = !visible;
        passwordRef.setAttribute('type', visible ? 'text' : 'password');
    }

    // LOGIN SUBMIT
    import { authContext } from "$lib/context/authContext";
    const handleLoginSubmit = async () => {
        disable = true;
        showError = false;
        const res = await authContext.login({username, password});
        setTimeout(() => {
            if(res == 401) {
                password = "";
                disable = false;
                showError = true;
            } 
        }, 500);
    }
</script>

<style>
    .login {
        background-color: var(--foreground-color);
        width: 280px;
        height: 190px;
        padding: 30px 25px 20px 25px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        transition: background-color var(--color-animation-timing) ease;
    }

    .login-input {
        height: 35px;
    }

    .login-pwd {
        padding-right: 28px;
    }

    .login-button {
        margin-top: auto;
        height: 40px;
        font-size: 15px;
    }

    .login-checkbox {
        position: relative;
        top: -153px;
        left: 276px;
        background: none;
        filter: var(--accent-color-filtered);
    }

    .login-checkbox:enabled:hover {
        cursor: pointer;
        background: none;
    }

    .login-checkbox:disabled {
        filter: var(--accent-color-filtered-disabled);
    }

    .login-error {
        position: absolute;
        transform: translate(0px, 150px);
        width: 200px;
        margin-top: 10px;
        padding-top: 5px;
        height: 45px;
        text-align: center;
        vertical-align: middle;
        color: var(--text-color-error);
        background-color: var(--foreground-color);
        border-radius: 8px;
        font-size: 13px;
        transition: color var(--color-animation-timing) ease, background-color var(--color-animation-timing) ease;
    }
    
    .title {
        display: flex;
        justify-content: center;
        font-size: 40px;
        margin-top: -90px;
        margin-bottom: 30px;
        transition: color var(--color-animation-timing) ease;
    }

    .signup-link {
        margin: -12px 0px 0px 8px;
        transition: color var(--color-animation-timing) ease;
    }
</style>

<div>
    <div class="title"> enum.usagi </div>
    <form class="login" on:submit|preventDefault={handleLoginSubmit} autocomplete="off">
        <!-- USERNAME -->
        <input 
            type="text" 
            name="username"
            class="login-input"
            minlength="4"
            maxlength="15"
            pattern="^[a-zA-Z0-9]+$"
            placeholder="ユーザー名"
            required
            bind:this={usernameRef}
            bind:value={username}
            on:invalid={() => usernameRef.setCustomValidity(`Alpha: a-z, A-Z\nDigit: 0-9`)}
            disabled={disable}
        >

        <!-- PASSWORD -->
        <input 
            type="password" 
            name="password"
            class="login-input login-pwd"
            minlength="8"
            maxlength="30"
            pattern="^[a-zA-Z0-9!@#$%^&*]+$"
            placeholder="パスワード"
            required
            bind:this={passwordRef}
            bind:value={password}
            on:invalid={() => passwordRef.setCustomValidity(`Alpha: a-z, A-Z\nDigit: 0-9\nSpecial: !@#$%^&*`)}
            disabled={disable}
        >
        {#if PUBLIC_DEMO !== "true"}<div class="signup-link">ユーザーではない？<a href="/signup">登録</a></div>{/if}

        <!-- SUBMIT -->
        <button 
            class="login-button"
            disabled={disable || !Boolean(username && password)}
            bind:this={loginButtonRef}
        > {#if disable}
            ...
        {:else}
            ログイン
        {/if}
        </button>
    </form>

    <!-- PASSWORD VISIBILITY -->
    <button disabled={disable || !Boolean(password)} class="login-checkbox" on:click={handlePasswordVisibility}>
        {#if visible}
            <VisOn />
        {:else}
            <VisOff />
        {/if}
    </button>
</div>

{#if showError}
    <div class="login-error">
        <div>ログインに失敗しました</div>
        <div>ユーザーが見つかりません</div>
    </div>
{/if}