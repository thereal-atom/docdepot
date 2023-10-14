<script lang="ts">
	import type { Document } from "$lib/api";
	import { track } from "@vercel/analytics";
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

    let tab: "markdown" | "preview";
    $: tab = "markdown";

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
                    message: `Find it at docdepot.vercel.app/view/${result.data.name}`,
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

                track("CreateDocument", { name: result.data.name });
            };

            loading = false;

            if (result.type !== "error") update();
        };
    };

    const handleNameInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replaceAll(" ", "-");
    };

    const handleFileInput = (e: Event) => {
        const target = e.target as HTMLInputElement & { files: File[] };

        for (const file of target.files) {
            const reader = new FileReader();

            reader.readAsText(file);

            reader.addEventListener("load", readerEvent => {
                markdownString = `{{DOC-DEPOT-FILE-INPUT}}${readerEvent.target.result.toString()}`;
            });
        };
    };
</script>

<div class="flex flex-col w-screen h-full p-16 px-64 max-xl:px-32 max-lg:px-16 max-sm:px-8">
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
        <p class="mt-6 text-indigo-400 font-bold text-sm">Press upload to publish the page. You will be provided with a URL you can share with others. Anyone will be able to view your document if they have the name.</p>
        <form
            class="mt-8"
            method="POST"
            use:enhance={handleCreateDocument}
        >
            <textarea class="hidden" value={markdownString} name="markdownString" />
            <div class="flex flex-col w-full">
                <div class="flex flex-row items-center">
                    <p class="font-bold">Name</p>
                    <div class="has-tooltip relative w-7">
                        <img
                            class="w-3 h-3 ml-2 opacity-60"
                            src="/icons/info.svg"
                            alt="i"
                        />
                        <div class="tooltip absolute hidden invisible left-5 bottom-1/2 translate-y-1/2">
                            <p class="w-max ml-2 mt-0.5 px-2 py-1 bg-white bg-opacity-10 rounded-md text-xs font-semibold max-sm:ml-0">Must be alphanumeric and can contain '-' and '_' characters only.</p>
                        </div>
                    </div>
                </div>
                <p class="text-xs opacity-30">It is suggested that you prefix the name with a username so that we can help you locate your documents if you don't write them down.</p>
                <div class="flex flex-row w-full mt-1 rounded-md border border-white border-opacity-10 max-sm:w-full">
                    <label
                        class="px-8 py-4 bg-black bg-opacity-10 text-white font-bold text-opacity-70 rounded-l-md border-r border-white border-opacity-10 max-sm:px-3 max-sm:text-xs"
                        for="name"
                    >
                        docdepot.vercel.app/view/
                    </label>
                    <input
                        class="w-full px-4 py-2 bg-inherit text-lg rounded-r-md max-sm:w-full max-sm:text-xs"
                        type="text"
                        name="name"
                        required
                        on:input={handleNameInput}
                    />
                </div>
            </div>
            <!-- TODO: extract into component -->
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
                    />
                {:else}
                    <div class="p-16 max-lg:p-8">
                        <Markdown of={markdownString} />
                    </div>
                {/if}
            </div>
            <p class="mt-1 text-sm font-semibold">
                Or select a markdown file from your
                <label
                    class="text-indigo-400 hover:cursor-pointer"
                    for="markdown_input"
                >
                    computer
                </label> 
                <input
                    class="hidden"
                    id="markdown_input"
                    name="md"
                    type="file"
                    accept=".md,.txt"
                    on:change={handleFileInput}
                />
            </p>
            <div class="flex flex-col mt-4">
                <div class="flex flex-row items-center">
                    <p class="font-bold">Password</p>
                    <div class="has-tooltip relative w-7">
                        <img
                            class="w-3 h-3 ml-2 opacity-60"
                            src="/icons/info.svg"
                            alt="i"
                        />
                        <div class="tooltip absolute hidden invisible left-5 bottom-1/2 translate-y-1/2">
                            <p class="w-max ml-2 mt-0.5 px-2 py-1 bg-white bg-opacity-10 rounded-md text-xs font-semibold max-sm:ml-0">Remember this. We cannot recover it.</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row items-center w-full justify-between mt-1 max-sm:flex-col">
                    <input
                        class="w-[450px] px-4 py-3 bg-inherit rounded-md border border-white border-opacity-10 max-sm:w-full max-sm:text-xs"
                        type="password"
                        name="password"
                        required
                    />
                    <button
                        class="w-fit ml-4 px-12 py-3 bg-indigo-500 font-bold rounded-md disabled:opacity-40 max-sm:w-full max-sm:ml-0 max-sm:mt-4"
                        disabled={loading}
                        data-tooltip-target="tooltip-default"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </form>
    {/if}
</div>

<style lang="postcss">
    .tab.active {
        @apply bg-white bg-opacity-[2%];
    }

    .tab {
        @apply w-full py-3 text-lg font-bold text-center transition-all outline-1 hover:bg-white hover:bg-opacity-[2%] max-sm:text-sm;
    }

    .has-tooltip:hover > .tooltip {
        @apply flex visible;
    }
</style>