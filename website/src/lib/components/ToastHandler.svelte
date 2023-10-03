<script>
	import { fly } from "svelte/transition";
	import { removeToast, toasts } from "$lib/stores/toasts";
</script>

<div class="fixed right-0 bottom-8 flex flex-col items-end justify-end 2xs:items-center pr-16 2xs:px-8 pt-8 2xs:w-screen z-40 transition-all max-sm:w-full max-sm:items-center max-sm:px-4">
    {#each $toasts as toast (toast.id)}
        <div
            class="mt-4 bg-primary rounded-md"
            in:fly={{ y: 200, duration: 300 }}
            out:fly={{ x: 200, duration: 300 }}
        >
            <div class="toast {toast.type} flex flex-col w-[400px] min-h-[100px] pl-6 pr-4 py-6 rounded-md border border-solid border-white border-opacity-20 transition-all max-sm:w-full">
                <div class="flex flex-row items-center max-sm:flex-col-reverse max-sm:items-start">
                    <div class="flex flex-col w-full">
                        <h1 class="font-bold max-sm:text-[16px]">{toast.title}</h1>
                        <p class="font-semibold opacity-60 max-sm:text-[12px]">
                            {#if toast.message?.includes("\n")}
                                {#each toast.message.split("\n") as line}
                                    <span>{line}<br/></span>
                                {/each}
                            {:else}
                                {toast.message || "An unknown error occurred"}
                            {/if}
                        </p>
                    </div>
                    <button
                        class="ml-6 w-10 h-8 text-xl font-bold text-center rounded-md border border-solid border-white border-opacity-20 max-sm:ml-0 max-sm:mb-2 max-sm:w-7 max-sm:h-7 max-sm:text-xs"
                        on:click={() => removeToast(toast.id)}
                    >
                        x
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
    .toast.error {
        @apply bg-red-900 bg-opacity-[15%];
    }

    .toast.success {
        @apply bg-green-900 bg-opacity-[15%];
    }
</style>