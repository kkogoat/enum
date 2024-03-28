<script lang="ts">
	import { authContext } from "$lib/context/authContext";
	import { onMount } from "svelte";

    onMount(() => {
        usernameRef.focus();
    });

    // INPUT REFS
    let formRef: HTMLFormElement;
    let usernameRef: HTMLInputElement;
    let passwordRef: HTMLInputElement;
    let confirmRef: HTMLInputElement;
    let loginButtonRef: HTMLButtonElement;

    // FORM
    let username: string;
    let password: string;
    let confirm: string;
    let disable: boolean;
    let showError: boolean;
    let errorMessage: string;
    async function handleSignupSubmit() {
        disable = true;
        showError = false;
        if(password != confirm) {
            showError = true;
            errorMessage = "パスワードが一致しない";
            setTimeout(() => {
                password = "";
                confirm = "";
                disable = false;
            }, 100);
        } else {
            const res = await authContext.signup({username, password});
            setTimeout(() => {
                if(res.status == 200) {
                    window.location.replace("/");
                }
                if(res.status == 409) {
                    showError = true;
                    errorMessage = "ユーザー名はすでに存在する";
                }
                formRef.reset();
                disable = false;
            }, 500);
        }        
    }

</script>

<style>
    .signup-container {
        width: 100vw;
        height: 100vh;
        display: flex; 
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .title {
        display: flex;
        justify-content: center;
        font-size: 40px;
        margin-top: -90px;
        margin-bottom: 30px;
        transition: color var(--color-animation-timing) ease;
    }

    .signup {
        background-color: var(--foreground-color);
        width: 280px;
        height: 250px;
        padding: 30px 25px 20px 25px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        transition: background-color var(--color-animation-timing) ease;
    }

    .signup-error {
        position: absolute;
        transform: translate(0px, 150px);
        width: 200px;
        margin-top: 10px;
        padding: 5px 0px 5px 0px;
        text-align: center;
        vertical-align: middle;
        color: var(--text-color-error);
        background-color: var(--foreground-color);
        border-radius: 8px;
        font-size: 13px;
        transition: color var(--color-animation-timing) ease, background-color var(--color-animation-timing) ease;
    }

    .signup-input {
        height: 35px;
    }

    .signup-pwd {
        padding-right: 28px;
    }

    .signup-button {
        margin-top: auto;
        height: 40px;
        font-size: 17px;
    }

    .login-link {
        margin: -12px 0px 0px 8px;
    }
</style>

<div class="signup-container">
    <div class="title"> enum.usagi </div>
    <form class="signup" on:submit|preventDefault ={handleSignupSubmit} autocomplete="off" bind:this={formRef}>
        <!-- USERNAME -->
        <input 
            type="text" 
            name="username"
            class="signup-input"
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
            class="signup-input signup-pwd"
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

        <!-- CONFIRM PASSWORD -->
        <input 
            type="password" 
            name="confirm-password"
            class="signup-input signup-pwd"
            minlength="8"
            maxlength="30"
            pattern="^[a-zA-Z0-9!@#$%^&*]+$"
            placeholder="確認"
            required
            bind:this={confirmRef}
            bind:value={confirm}
            on:invalid={() => confirmRef.setCustomValidity(`Alpha: a-z, A-Z\nDigit: 0-9\nSpecial: !@#$%^&*`)}
            disabled={disable}
        >
        <div class="login-link">すでに登録済みですか？<a href="/">ログイン</a></div>

        <!-- SUBMIT -->
        <button 
            class="signup-button"
            disabled={disable || !Boolean(username && password && confirm)}
            bind:this={loginButtonRef}
        > {#if disable}
            ...
        {:else}
            登録する
        {/if}
        </button>
    </form>
    
    {#if showError}
        <div class="signup-error">
            <div>{errorMessage}</div>
        </div>
    {/if}
</div>

