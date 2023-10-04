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
</script>

<textarea
    class="p-8 bg-inherit rounded-md max-sm:p-4 max-sm:text-sm placeholder:text-sm placeholder:font-bold"
    name="markdownString"
    on:input={handleMarkdownTextAreaInput}
    value={markdownString || ""}
    required
    placeholder="Write some **markdown**"
/>