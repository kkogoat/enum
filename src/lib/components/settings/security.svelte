<script lang="ts">
	import { authContext } from "$lib/context/authContext";
    import ErrorModal from "../error/errorModal.svelte";

    // REFS
    let formRef: HTMLFormElement;
    let currentRef: HTMLInputElement;
    let newRef: HTMLInputElement;
    let confirmRef: HTMLInputElement;
    let changeRef: HTMLButtonElement;

    // FORM
    let current: string;
    let newPass: string;
    let confirm: string;
    let disable: boolean;
    let errorRef: any;
    let errorMessage: string;
    async function handleChangePassword() {
        disable = true;
        if(newPass != confirm) {
            setTimeout(() => {
                errorMessage = "Pasword Confirmation does not match"
                errorRef.showModal();
                formRef.reset();
                disable = false;
            }, 100);
        } else {
            const res = await authContext.change({current, newPass, confirm});
            setTimeout(() => {
                if(res.status == 401) {
                    errorMessage = "Wrong current password";
                    errorRef.showModal();
                } else if(res.status == 500) {
                    errorMessage = "Server error... Please try again later";
                    errorRef.showModal();
                } else if(res.status == 200) {
                    errorMessage = "Password Successfully Changed";
                    errorRef.showModal("ok");
                } else if(res.status == 403) {
                    errorMessage = "Cannot change this account's password";
                    errorRef.showModal();
                }
                formRef.reset();
                disable = false;
            }, 500);
        }
    }
    
</script>

<style>
    .change-form-title {
        padding-top: 3px;
    }
    
    .change-form {
        padding-top: 3px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .change-input {
        height: 30px;
    }
    
    .change-button {
        margin-top: 15px;
        padding: 5px 15px 5px 15px;
        align-self: start;
    }

</style>

<div>
    <ErrorModal bind:this={errorRef} errorMessage={errorMessage} />
    <div class="change-form-title">Change Password:</div>
    <form class="change-form" on:submit|preventDefault={handleChangePassword} autocomplete="off" bind:this={formRef}>
        <!-- CURRENT -->
        <input class="change-input" type="password" name="current"
            minlength="8" maxlength="30"
            pattern="^[a-zA-Z0-9!@#$%^&*]+$"
            placeholder="現在のパスワード"
            required
            bind:this={currentRef}
            bind:value={current}
            on:invalid={() => currentRef.setCustomValidity(`Alpha: a-z, A-Z\nDigit: 0-9`)}
            disabled={disable}
        />

        <!-- NEW -->
        <input class="change-input" type="password" name="current"
            minlength="8" maxlength="30"
            pattern="^[a-zA-Z0-9!@#$%^&*]+$"
            placeholder="新しいパスワード"
            required
            bind:this={newRef}
            bind:value={newPass}
            on:invalid={() => newRef.setCustomValidity(`Alpha: a-z, A-Z\nDigit: 0-9`)}
            disabled={disable}
        />

        <!-- CONFIRM -->
        <input class="change-input" type="password" name="current"
            minlength="8" maxlength="30"
            pattern="^[a-zA-Z0-9!@#$%^&*]+$"
            placeholder="パスワードの確認"
            required
            bind:this={confirmRef}
            bind:value={confirm}
            on:invalid={() => confirmRef.setCustomValidity(`Alpha: a-z, A-Z\nDigit: 0-9`)}
            disabled={disable}
        />

        <!-- SUBMIT -->
        <button
            class="change-button"
            disabled={disable || !Boolean(current && newPass && confirm)}
            bind:this={changeRef}
        > {#if disable}
            ...
        {:else}
            登録する
        {/if}
        </button>
    </form>
</div>