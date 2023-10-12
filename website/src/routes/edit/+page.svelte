<script lang="ts">
	import Markdown from "$lib/components/Markdown.svelte";
	import MarkdownInput from "$lib/components/MarkdownInput.svelte";
	import { markdownStore } from "$lib/stores/markdown";
	import { onMount } from "svelte";

    $: markdownString = $markdownStore;

    let tab: "markdown" | "preview";
    $: tab = "markdown";

    let textHistory: {
        value: string;
        cursorPosition: number;
    }[];
    $: textHistory = [];

    // dodgy types lol
    const handleTextAreaKeyboardShortcuts = (event: { detail: Event }) => {
        const e = event.detail as KeyboardEvent;

        const textarea = e.target as HTMLTextAreaElement;

        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;

        const selectedText = textarea.value.slice(selectionStart, selectionEnd);

        // idk how to name this
        const _ = "{{syntax-open}}{{content}}{{syntax-close}}";
        const surroundElementShortcuts = {
            "b": "**",
            "i": "*",
            "U": "~",
            "S": "~~",
        };

        if (Object
            .keys(surroundElementShortcuts)
            .find(shortcut => shortcut === e.key)
        ) {
            e.preventDefault();

            textHistory.push({
                value: textarea.value,
                cursorPosition: selectionEnd,
            });

            textarea.setRangeText(_
                .replace("{{content}}", selectedText)
                .replace("{{syntax-open}}", surroundElementShortcuts[e.key])
                .replace("{{syntax-close}}", surroundElementShortcuts[e.key])
            );
            textarea.setSelectionRange(selectionEnd + 2, selectionEnd + 2);

            markdownString = textarea.value;
        };

        switch (e.key) {
            case "z":
                if (textHistory.length === 0) {
                    return;
                };

                e.preventDefault();

                // TODO: make undo move caret to position at time of original action

                const lastAction = textHistory.pop();

                markdownString = lastAction.value;
                textHistory = textHistory;
                textarea.setSelectionRange(lastAction.cursorPosition, lastAction.cursorPosition)

                break;
        };
    };

    onMount(() => {
        document.addEventListener("keydown", e => {
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

    /**
     * TODO: remainder of keyboard shortcuts
     * https://www.google.com/search?client=firefox-b-d&sca_esv=572931913&sxsrf=AM9HkKlUEwBcF4Hudr0A36k7659wys2XDQ:1697136645934&q=markdown+shortcuts&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjR66nXlvGBAxV7WUEAHaz3AuEQ0pQJegQIDBAB&biw=1920&bih=1039&dpr=2#imgrc=4dV1rySjxGJ1uM
     * 1, 2, 3 - heading 1, 2, 3
     * g - unordered list
     * j - ordered list
     * k - link
     * ? - markdown cheat sheet including list of shortcuts
    */

    // TODO: if selected text and '(', '[', '{', '\'', '"', surround selected text with that symbol

    // TODO: syntax highlighting

    // TODO: render markdown input as normal markdown but with syntax (highlighted)

    // TODO: suggest shortcuts when they're not used but can be

    // TODO: markdown cheat sheet

    // TODO: redo
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