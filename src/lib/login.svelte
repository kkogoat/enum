<script lang="ts">
	import { onMount } from "svelte";

    let usernameRef: HTMLElement;
    let passwordRef: HTMLElement;
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
    import { authContext } from "./authContext";
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
        }, 1000);
    }
</script>

<style>
    .login {
        background-color: #262b35;
        width: 280px;
        height: 190px;
        padding: 30px 25px 20px 25px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .login-input {
        background-color: #171a20;
        border: none;
        border-radius: 8px;
        color: white;
        padding-left: 10px;
        height: 35px;
        outline: 1px solid transparent;
        transition: .1s ease-out;
    }

    .login-input:disabled {
        background-color: #101216;
        color: #818181;
    }

    .login-input::placeholder {
        color: #949494;
    }

    .login-input:focus {
        box-shadow: 0 0 15px #2b93cf;
        transition: .2s ease-in-out;
        outline: 1px solid #2b93cf;
    }

    .login-button {
        margin-top: auto;
        height: 40px;
        background-color: #2b93cf;
        color: #ffffff;
        font-weight: bold;
        font-size: 15px;
        border: none;
        border-radius: 8px;
        transition: .1s ease-out;
    }

    .login-button:disabled {
        background-color: #1e6892;
        color: #7a7a7a;
    }

    .login-button:enabled:hover {
        background-color: #33b3fd;
        cursor: pointer;
    }

    .login-checkbox {
        position: relative;
        top: -150px;
        left: 118px;
        background: none;
        border: none;
        filter: invert(53%) sepia(48%) saturate(2480%) hue-rotate(182deg) brightness(110%) contrast(98%);
        transition: .1s ease-out;
    }

    .login-checkbox:enabled:hover {
        cursor: pointer;
    }

    .login-checkbox:disabled {
        filter: invert(23%) sepia(10%) saturate(5113%) hue-rotate(165deg) brightness(90%) contrast(89%);
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
        color: #d11313;
        background-color: #262b35;
        border-radius: 8px;
        font-size: 13px;
    }
</style>

<form class="login" on:submit|preventDefault={handleLoginSubmit}>
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
        disabled={disable}
    >

    <!-- PASSWORD -->
    <input 
        type="password" 
        name="password"
        class="login-input"
        minlength="8"
        maxlength="30"
        placeholder="パスワード"
        required
        bind:this={passwordRef}
        bind:value={password}
        disabled={disable}
    >

    <!-- SUBMIT -->
    <button 
        class="login-button"
        disabled={disable || !Boolean(username && password)}
        bind:this={loginButtonRef}
    > ログイン </button>
</form>

<!-- PASSWORD VISIBILITY -->
<button disabled={disable || !Boolean(password)} class="login-checkbox" on:click={handlePasswordVisibility}>
    <img loading=eager src={visible ? '/visOn.svg' : '/visOff.svg'} width="20" alt="visibility-off">
</button>

{#if showError}
    <div class="login-error">
        <div>ログインに失敗しました</div>
        <div>ユーザーが見つかりません</div>
    </div>
{:else}
    <span></span>
{/if}