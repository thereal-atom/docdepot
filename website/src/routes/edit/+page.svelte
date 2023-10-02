<script>
	import Markdown from "$lib/components/Markdown.svelte";
	import MarkdownInput from "$lib/components/MarkdownInput.svelte";
	import { markdownStore } from "$lib/stores/markdown";

    $: markdownString = $markdownStore;
    $: markdownStore.set(markdownString);
</script>

<div class="flex flex-col p-16 min-h-screen">
    <p>Markdown Editor</p>
    <div class="flex flex-row mt-4 max-lg:flex-col">
        <div class="flex flex-col w-1/2 max-lg:w-full">
            <h2>Markdown</h2>
            <MarkdownInput
                {markdownString}
                on:input={e => markdownString = e.detail}
            />
        </div>
        <div class="flex flex-col w-1/2 ml-8 max-lg:w-full max-lg:ml-0 max-lg:mt-8">
            <h2>Preview</h2>
            <div class="mt-4 p-8 rounded-md border border-solid border-white border-opacity-5">
                <Markdown of={markdownString} />
            </div>
        </div>
    </div>
    <div class="flex flex-row mt-4">
        <a
            class="px-8 py-3 bg-indigo-500 rounded-md font-bold w-fit"
            href="/upload"
        >
            Upload
        </a>
        <button
            class="ml-4 px-4 py-3 bg-gray-500 rounded-md font-bold w-fit"
            on:click={() => markdownString = ""}
        >
            Clear Markdown
        </button>
    </div>
</div>

<style lang="postcss">
    h2 {
        @apply text-2xl font-bold;
    }
</style>