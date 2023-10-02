<script lang="ts">
	import Markdown from "$lib/components/Markdown.svelte";
	import MarkdownInput from "$lib/components/MarkdownInput.svelte";
	import { markdownStore } from "$lib/stores/markdown";

    $: markdownString = $markdownStore;

    const createDocument = (e: any) => {
        if (!e.target) return;

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        console.log(data);
    };
</script>


<div class="flex flex-col w-screen min-h-screen p-16 border-t border-solid border-white border-opacity-5 max-sm:px-8">
    <h1 class="text-4xl font-black max-sm:text-3xl max-[330px]:text-2xl">Upload Markdown</h1>
    <form
        class="flex flex-col mt-4"
        on:submit|preventDefault={createDocument}
        autocomplete="off"
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
                <div class="md mt-2 p-8 rounded-md border border-solid border-white border-opacity-5">
                    <Markdown of={markdownString}/>
                </div>
            </div>
        </div>
        <p class="my-4 text-indigo-400 font-bold">Step 2. Name the markdown document. This is where people can find it.</p>
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
        <p class="my-4 text-indigo-400 font-bold">Step 3. If you're not logged in, you must provide a password in order to be able to add the page to your account once you have one.</p>
        <div class="flex flex-col mt-4">
            <div class="flex flex-col">
                <label
                    class="font-bold"
                    for="password"
                >
                    Password
                </label>
                <input
                    class="w-[350px] mt-2 px-4 py-3 bg-inherit rounded-md border border-solid border-white border-opacity-5 max-sm:w-full max-sm:text-xs"
                    type="password"
                    name="password"
                    required
                />
            </div>
        </div>
        <p class="my-4 text-indigo-400 font-bold">Step 4. Press upload to publish the page. You will be provided with a URL you can share with others.</p>
        <button class="w-fit px-12 py-3 bg-indigo-500 font-bold rounded-md">Upload</button>
    </form>
</div>

<style lang="postcss">
    .content p {
        @apply opacity-70;
    }

    p {
        @apply max-sm:text-sm max-[330px]:text-xs;
    }
</style>