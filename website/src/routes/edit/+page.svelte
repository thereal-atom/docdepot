<script lang="ts">
	import Markdown from "$lib/components/Markdown.svelte";
	import MarkdownInput from "$lib/components/MarkdownInput.svelte";
	import { markdownStore } from "$lib/stores/markdown";
	import { onMount } from "svelte";

    $: markdownString = $markdownStore;

    let tab: "markdown" | "preview";
    $: tab = "markdown";

    $: textHistory = [];

    // dodgy types lol
    const handleTextAreaKeyboardShortcuts = (event: { detail: Event }) => {
        const e = event.detail as KeyboardEvent;
        const textarea = e.target as HTMLTextAreaElement;

        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;

        const selectedText = textarea.value.slice(selectionStart, selectionEnd);

        switch (e.key) {
            case "b":
                e.preventDefault();

                textHistory.push(textarea.value);

                textarea.setRangeText(`**${selectedText}**`);
                textarea.setSelectionRange(selectionEnd + 2, selectionEnd + 2);

                markdownString = textarea.value;

                break;
            case "i":
                e.preventDefault();

                textHistory.push(textarea.value);

                textarea.setRangeText(`*${selectedText}*`);
                textarea.setSelectionRange(selectionEnd + 2, selectionEnd + 2);

                markdownString = textarea.value;

                break;
            case "z":
                if (textHistory.length === 0) {
                    return;
                };

                e.preventDefault();

                markdownString = textHistory.pop();
                textHistory = textHistory;

                break;
        };
    };

    onMount(() => {
        document.addEventListener("keydown", e => {
            console.log(e.altKey);
            
            if (!e.altKey) {
                return;
            };

            switch (e.key) {
                case "p":
                    tab = "preview";

                    break;
                case "m":
                    tab = "markdown";

                    break;
            };
        });
    });

    // TODO: syntax highlighting

    // TODO: render markdown input as normal markdown but with syntax (highlighted)
</script>

<div class="flex flex-col p-16 min-h-screen max-sm:p-8">
    <h1 class="text-4xl font-black max-sm:text-3xl max-[330px]:text-2xl">Markdown Editor</h1>
    <!-- TODO: extract into component (because upload has the same tab html) -->
    <div class="flex flex-row w-full mt-4 rounded-md border border-white border-opacity-10">
        <button
            class="tab border-r border-white border-opacity-10 {tab === "markdown" ? "active" : ""}"
            type="button"
            on:click={() => tab = "markdown"}
            tabindex="-1"
        >
            Markdown
        </button>
        <button
            class="tab {tab === "preview" ? "active" : ""}"
            type="button"
            on:click={() => tab = "preview"}
            tabindex="-1"
        >
            Preview
        </button>
    </div>
    <div class="flex flex-col w-full mt-4 rounded-md border border-solid border-white border-opacity-10">
        {#if tab === "markdown"}
            <MarkdownInput
                {markdownString}
                on:input={e => {
                    markdownStore.set(e.detail);
                    markdownString = "";
                }}
                on:shortcut={handleTextAreaKeyboardShortcuts}
            />
        {:else}
            <div class="p-16 max-lg:p-8">
                <Markdown of={markdownString} />
            </div>
        {/if}
    </div>
    <div class="flex flex-row mt-4">
        <a
            class="px-8 py-3 bg-indigo-500 rounded-md font-bold w-fit max-sm:text-sm"
            href="/upload"
        >
            Upload
        </a>
        <button
            class="ml-4 px-4 py-3 bg-gray-500 rounded-md font-bold w-fit max-sm:text-sm"
            on:click={() => markdownStore.set("")}
        >
            Clear Markdown
        </button>
    </div>
</div>

<style lang="postcss">
    .tab.active {
        @apply bg-white bg-opacity-[2%];
    }

    .tab {
        @apply w-full py-3 text-lg font-bold text-center transition-all outline-1 hover:bg-white hover:bg-opacity-[2%] max-sm:text-sm;
    }
</style>