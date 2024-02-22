<script lang="ts">
	import { onMount } from "svelte";

    let usernameRef: HTMLElement;
    let passwordRef: HTMLElement;
    let loginButtonRef: HTMLElement;
    let username: string;
    let password: string;
    let disable: boolean;

    onMount(() => {
        usernameRef.focus();
    });

    // PASSWORD VISIBILITY
    const handlePasswordVisibility = (event: Event) => {
        let checked: boolean = (event.target as HTMLInputElement).checked;
        passwordRef.setAttribute('type', checked ? 'text' : 'password');
    }

    // LOGIN SUBMIT
    import { authContext } from "./authContext";
    const handleLoginSubmit = async () => {
        disable = true;
        const res = await authContext.login({username, password});
        setTimeout(() => {
            if(res == 401) {
                password = "";
                disable = false;
            } 
        }, 1000);
    }
</script>

<style>
    .login {
        background-color: #262b35;
        width: 400px;
        height: 200px;
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
        color: #171a20;
        accent-color: #171a20;
    }
    .login-checkbox::after {
        accent-color: #171a20;
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
        placeholder="Enter your username"
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
        placeholder="Enter your password"
        required
        bind:this={passwordRef}
        bind:value={password}
        disabled={disable}
    >

    <!-- PASSWORD VISIBILITY -->
    <label>
        <input class="login-checkbox" type="checkbox" name="password visibility" on:click={handlePasswordVisibility}>
        <span style="color: white">Show Password?</span>
    </label>

    <!-- SUBMIT -->
    <button 
        class="login-button"
        disabled={disable || !Boolean(username && password)}
        bind:this={loginButtonRef}
    > Login </button>
</form>