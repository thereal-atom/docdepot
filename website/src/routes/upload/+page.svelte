<script lang="ts">
	import type { Document } from "$lib/api";
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Markdown from "$lib/components/Markdown.svelte";
	import MarkdownInput from "$lib/components/MarkdownInput.svelte";
	import { markdownStore } from "$lib/stores/markdown";
	import { addToast } from "$lib/stores/toasts";

    $: loading = false;
    $: markdownString = $markdownStore;
    
    let newDocument: Document;
    $: newDocument;

    // TODO: figure out types
    const handleCreateDocument = () => {
        loading = true;

        return async ({
            result,
            update,
        }) => {
            addToast(
                result.type === "success" ? {
                    title: "Document uploaded successfully",
                    message: `Find it at docdepot.com/view/${result.data.name}`,
                    type: "success",
                }
                : result.type === "error" ? {
                    title: "There was an error uploading your document",
                    message: result.error.message,
                    type: "error",
                }
                : undefined
            );

            if (result.type === "success") {
                markdownStore.set("");
                markdownString = "";
                newDocument = result.data;
            };

            loading = false;

            if (result.type !== "error") update();
        };
    };
</script>


<div class="flex flex-col w-screen min-h-screen p-16 max-sm:px-8">
    {#if newDocument}
        <div class="flex flex-col h-full p-16 max-[330px]:px-8">
            <h1 class="text-4xl font-bold max-sm:text-3xl">Success!</h1>
            <p class="font-semibold mt-2 max-sm:text-sm">Your markdown document is now public. View it here: <a class="text-indigo-500" href="/view/{newDocument.name}">{$page.url.host}/view/{newDocument.name}</a></p>
            <div class="flex flex-row mt-4 max-sm:flex-col">
                <button
                    class="px-4 py-3 bg-indigo-500 rounded-md font-bold max-sm:w-fit max-sm:text-sm"
                    on:click={() => newDocument = undefined}
                >
                    Upload Another Document
                </button>
                <a
                    class="ml-4 px-4 py-3 bg-indigo-500 rounded-md font-bold max-sm:ml-0 max-sm:mt-2 max-sm:w-fit max-sm:text-sm"
                    href="/edit"
                >
                    Edit Markdown
                </a>
            </div>
        </div>
    {:else}
        <h1 class="text-4xl font-black max-sm:text-3xl max-[330px]:text-2xl">Upload Markdown</h1>
        <form
            class="flex flex-col mt-4"
            method="POST"
            use:enhance={handleCreateDocument}
        >
            <p class="my-4 text-indigo-400 font-bold">Step 1. Paste your markdown in the input box on the left.</p>
            <div class="content flex flex-row max-lg:flex-col">
                <div class="flex flex-col w-1/2 max-lg:w-full">
                    <h2 class="text-2xl font-bold max-[330px]:text-xl">Markdown Text</h2>
                    <p>Paste your raw markdown text below.</p>
                    <MarkdownInput
                        {markdownString}
                        on:input={e => markdownString = e.detail}
                    />
                </div>
                <div class="flex flex-col w-1/2 ml-16 max-lg:w-full max-lg:ml-0 max-lg:mt-8">
                    <h2 class="text-2xl font-bold max-[330px]:text-xl">Preview</h2>
                    <p class="opacity-70">This is how your markdown will look when it's published.</p>
                    <div class="md mt-2 p-8 rounded-md border border-solid border-white border-opacity-5 max-sm:p-4">
                        <Markdown of={markdownString}/>
                    </div>
                </div>
            </div>
            <p class="my-4 text-indigo-400 font-bold">Step 2. Name the markdown document. This is where people can find it.</p>
            <div class="flex flex-col">
                <div class="flex flex-row max-sm:flex-col">
                    <p class="font-bold">Name</p>
                    <p class="ml-2 mt-0.5 text-sm opacity-60 max-sm:ml-0">Must be alphanumeric and can contain '-' and '_' characters only.</p>
                </div>
                <div class="flex flex-row w-min rounded-md border border-solid border-white border-opacity-5 max-sm:w-full">
                    <label
                        class="px-4 py-3 bg-black bg-opacity-5 text-white font-bold text-opacity-70 rounded-l-md border-r border-solid border-white border-opacity-5 max-sm:px-3 max-sm:text-xs"
                        for="name"
                    >
                        docdepot.com/view/
                    </label>
                    <input
                        class="w-min px-4 py-2 bg-inherit rounded-r-md max-sm:w-full max-sm:text-xs"
                        type="text"
                        name="name"
                        required
                    />
                </div>
            </div>
            <p class="my-4 text-indigo-400 font-bold">Step 3. If you're not logged in, you must provide a password in order to be able to add the page to your account once you have one.</p>
            <div class="flex flex-col mt-4">
                <div class="flex flex-col">
                    <div class="flex flex-row max-sm:flex-col">
                        <p class="font-bold">Password</p>
                        <p class="ml-2 mt-0.5 text-sm opacity-60 max-sm:ml-0">Remember this. We cannot recover it.</p>
                    </div>
                    <input
                        class="w-[350px] mt-2 px-4 py-3 bg-inherit rounded-md border border-solid border-white border-opacity-5 max-sm:w-full max-sm:text-xs"
                        type="password"
                        name="password"
                        required
                    />
                </div>
            </div>
            <p class="my-4 text-indigo-400 font-bold">Step 4. Press upload to publish the page. You will be provided with a URL you can share with others.</p>
            <button
                class="w-fit px-12 py-3 bg-indigo-500 font-bold rounded-md disabled:opacity-40"
                disabled={loading}
            >
                Upload
            </button>
        </form>
    {/if}
</div>

<style lang="postcss">
    .content p {
        @apply opacity-70;
    }

    p {
        @apply max-sm:text-sm max-[330px]:text-xs;
    }
</style>