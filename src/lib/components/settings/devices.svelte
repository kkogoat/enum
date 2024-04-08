<script lang="ts">
    // DEVICE LIST ON MOUNT
    let list: any = [];
    import { customFetch } from "$lib/util/customFetchUtil";
	import { authContext } from "$lib/context/authContext";
    $: if($authContext) getDevices();
    async function getDevices() {
        const response = await customFetch.get('/api/auth/get-devices');
        list = await response.json();
    }

    // DATE PARSING
    function dateParse(d: string) {
        const date = new Date(d);
        let date_access: string = String(date.getMonth()+1).padStart(2, '0') + '-'
                        + String(date.getDate()).padStart(2, '0') + '-'
                        + String(date.getFullYear());
        let timestamp: string = String(date.getHours()).padStart(2, '0') + ":"
                        + String(date.getMinutes()).padStart(2, '0') + ":"
                        + String(date.getSeconds()).padStart(2, '0');
        return `${date_access} ${timestamp}`;
    }

    // HANDLE LOGOUT
    import ErrorModal from "../error/errorModal.svelte";
    let errorRef: any;
    let errorMessage: string;
    let disable: boolean = false;
    async function logout(id: string) {
        disable = true;
        const result = await customFetch.post('/api/auth/logout-device', JSON.stringify({id}));
        setTimeout(async () => {
            if(result.ok) {
                list = list.filter((item: any) => item.id != id);
            } else {
                errorMessage = await result.json();
                errorRef.showModal();
            }
            disable = false;
        }, 500);
    }
</script>

<style>
    .list-container {
        padding-top: 3px;
        min-height: 200px;
    }

    .layer-1 {
        font-size: 15px;
    }

    .layer-2 {
        font-size: 11px;
        color: var(--background-color-placeholder-text);
    }

    .pos-1 {
        padding: 3px 0px 6px 0px;
        background-color: var(--background-color);
    }
    .pos-2 {
        padding: 3px 0px 6px 0px;
        background-color: var(--foreground-color);
    }

    .logout-button {
        padding: 5px 10px 5px 10px;
        float: right;
        margin-top: -30px;
        margin-right: 10px;
    }
</style>

<ErrorModal bind:this={errorRef} errorMessage={errorMessage}/>
<div class="list-container">
    {#each Object.keys(list) as item, index}
        {@const device = list[item].device.split(':')}
        <div class={index % 2 ? "pos-2" : "pos-1"}>
            <div class="layer-1">
                {device[0]} {device[1]} 
            </div>
            <div class="layer-2">
                Last Accessed: {dateParse(list[item].updated_at)}
            </div>
            <button 
                class="logout-button" 
                on:click={() => logout(list[item].id)}
                disabled={disable}
            > logout
            </button>
        </div>
    {/each}
</div>