<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

    export let markdownString = "";

    const dispatch = createEventDispatcher();

    const setTextAreaHeight = (e: any) => {
        e.target.style.height = "";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    onMount(() => setTextAreaHeight({ target: document.querySelector("textarea") }));

    const handleMarkdownTextAreaInput = (e: any) => {
        setTextAreaHeight(e);
        dispatch("input", e.target.value);
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
    value={markdownString || ""}
    required
    placeholder="Write some **markdown**"
/>