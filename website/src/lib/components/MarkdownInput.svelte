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
        // would rather have inline but it cries about type shit

        setTextAreaHeight(e);
        dispatch("input", e.target.value);
    };
</script>

<textarea
    class="mt-4 mr-4 p-8 bg-inherit rounded-md border border-solid border-white border-opacity-5 max-sm:p-4 max-sm:text-sm"
    name="markdownString"
    on:input={handleMarkdownTextAreaInput}
    value={markdownString || ""}
    required
/>