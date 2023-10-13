<script lang="ts">
	import { markdownStore } from "$lib/stores/markdown";
	import { createEventDispatcher, onMount } from "svelte";

    export let markdownString = "";

    const dispatch = createEventDispatcher();

    const setTextAreaHeight = () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    let textarea: HTMLTextAreaElement | undefined;
    $: textarea = undefined;

    $: markdownString, (() => {
        if (!textarea) return;

        // janky asl but makes pasting markdown from file work
        if (markdownString.includes("{{DOC-DEPOT-FILE-INPUT}}")) {
            markdownString = markdownString.replace("{{DOC-DEPOT-FILE-INPUT}}", "");
            markdownStore.set(markdownString);
            textarea.setSelectionRange(0, 0);
            textarea.setRangeText(markdownString);
        };

        setTextAreaHeight();
    })();

    onMount(() => {
        setTextAreaHeight();
    });

    const handleMarkdownTextAreaInput = () => {
        dispatch("input", textarea.value);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!e.ctrlKey && !e.altKey) {
            return;
        };

        const target = e.target as HTMLTextAreaElement;
        
        if (target?.id !== "markdown-input") {
            return;
        };

        dispatch("shortcut", e);
    };
</script>

<textarea
    class="p-8 bg-inherit rounded-md resize-none max-sm:p-4 max-sm:text-sm placeholder:text-sm placeholder:font-bold"
    id="markdown-input"
    name="markdownString"
    on:input={handleMarkdownTextAreaInput}
    on:keydown={handleKeyDown}
    value={markdownString}
    required
    placeholder="Write some **markdown**"
    bind:this={textarea}
/>