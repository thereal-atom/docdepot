<script>
    $: tab = "markdown";
</script>

<div class="flex flex-col w-[640px] mt-8 border border-white border-opacity-10 bg-primary rounded-md transition-all max-md:w-[500px] max-sm:w-[380px] max-[400px]:w-[300px]">
    <div class="flex flex-row w-full ">
        <button
            class="w-1/2 py-1 text-[8px] rounded-md m-2 transition-all hover:cursor-pointer focus:outline-none {tab === "markdown" ? "bg-white bg-opacity-5" : ""}"
            on:click={() => tab = "markdown"}
        >
            Markdown Editor
        </button>
        <button
            class="w-1/2 py-1 text-[8px] rounded-md m-2 transition-all hover:cursor-pointer focus:outline-none {tab === "preview" ? "bg-white bg-opacity-5" : ""}"
            on:click={() => tab = "preview"}
        >
            Published Markdown
        </button>
    </div>
    {#if tab === "markdown"}
        <div class="flex flex-col w-full h-[360px] overflow-y-hidden bg-primary py-4 px-16 rounded-b-md max-md:h-[280px] max-sm:h-[200px] max-sm:px-8 max-[400px]:h-[140px] max-[400px]:px-4">
            <p class="h1"><span class="hash">#</span> a guide to doc depot</p>
            <p class="p">DocDeopt is a very simple solution to upload your markdown files</p>
            <p class="p">In just a few steps, you can make your knowledge available to the whole world via Markdown and DocDepot.</p>
            <p class="h2"><span class="hash">#</span><span class="hash">#</span> Step 1. Go to the upload page</p>
            <p class="p">Go to DocDepot's upload page at: <span class="syntax">[</span>upload<span class="syntax">](</span><span class="a">https://docdepot.vercel.app/upload</span><span class="syntax">)</span></p>
            <p class="h2"><span class="hash">#</span><span class="hash">#</span> Step 2. Paste your markdown</p>
            <p class="p">From here, the page will show you the step by step on how to upload your file.</p>
            <p class="p">You will see two main boxes towards the top of the page. Paste your markdown into the box on the left and it will show you a preview in the box in the right. This is example how it will look like when it's uploaded.</p>
            <div class="h2"><span class="hash">#</span><span class="hash">#</span> Step 3. Name your document</div>
            <p class="p">The next input box will ask you for a name for your document. This is the name by which people can access your document.</p>
            <p class="p">If you name your document <span class="syntax">`</span>guide<span class="syntax">`</span>, it will be found under the following URL: <span class="syntax">[</span>https://docdepot.vercel.app/guide<span class="syntax">](</span><span class="a">https://docdepot.vercel.app/guide</span><span class="syntax">)</span></p>
            <p class="p">Everyone will be able to view it but I am working on features which will allow you to restrict viewership.</p>
            <div class="h2"><span class="hash">#</span><span class="hash">#</span> Step 4. Protect your document</div>
            <p class="p">On the home page I state that you don't need to login in order to publish your markdown. This is true but also not very secure so, if you are not logged in, you need to provide a password.</p>
            <p class="p">This will be used if you want to edit/remove your document and when you want to add the document to your account. Once you add the document to your account, you can edit/remove it without having to enter the password.</p>
            <div class="h2"><span class="hash">#</span><span class="hash">#</span> Step 5. Upload your document</div>
            <p class="p">There will be a button at the bottom of the page which you should press. Your document is now published.</p>
            <p class="p">As mentioned earlier, it will be found at <span class="syntax">[</span> https://docdepot.vercel.app/view/{"<"}name> <span class="syntax">](</span><span class="a">https://docdepot.vercel.app/guide</span><span class="syntax">)</span>, and it will give you the URL when you upload.</p>
            <p class="p"><span class="syntax">**</span>And that's it.<span class="syntax">**</span> This is supposed to be a very simple tool at this point, and will stay this way for a while.</p>
        </div>
    {:else}
        <div class="flex flex-col w-full h-[360px] overflow-y-hidden bg-primary py-4 px-16 rounded-b-md max-md:h-[280px] max-sm:h-[200px] max-sm:px-8 max-[400px]:h-[140px] max-[400px]:px-4">
            <p class="h1">a guide to doc depot</p>
            <p class="p">DocDeopt is a very simple solution to upload your markdown files</p>
            <p class="p">In just a few steps, you can make your knowledge available to the whole world via Markdown and DocDepot.</p>
            <p class="h2">Step 1. Go to the upload page</p>
            <p class="p">Go to DocDepot's upload page at: <span class="a">upload</span></p>
            <p class="h2">Step 2. Paste your markdown</p>
            <p class="p">From here, the page will show you the step by step on how to upload your file.</p>
            <p class="p">You will see two main boxes towards the top of the page. Paste your markdown into the box on the left and it will show you a preview in the box in the right. This is example how it will look like when it's uploaded.</p>
            <div class="h2">Step 3. Name your document</div>
            <p class="p">The next input box will ask you for a name for your document. This is the name by which people can access your document.</p>
            <p class="p">If you name your document <span class="code">guide</span>, it will be found under the following URL: <span class="a">https://docdepot.vercel.app/guide</span></p>
            <p class="p">Everyone will be able to view it but I am working on features which will allow you to restrict viewership.</p>
            <div class="h2">Step 4. Protect your document</div>
            <p class="p">On the home page I state that you don't need to login in order to publish your markdown. This is true but also not very secure so, if you are not logged in, you need to provide a password.</p>
            <p class="p">This will be used if you want to edit/remove your document and when you want to add the document to your account. Once you add the document to your account, you can edit/remove it without having to enter the password.</p>
            <div class="h2">Step 5. Upload your document</div>
            <p class="p">There will be a button at the bottom of the page which you should press. Your document is now published.</p>
            <p class="p">As mentioned earlier, it will be found at <span class="a">https://docdepot.vercel.app/view/{"<"}name</span>, and it will give you the URL when you upload.</p>
            <p class="p"><span class="bold">And that's it.</span> This is supposed to be a very simple tool at this point, and will stay this way for a while.</p>
        </div>
    {/if}
</div>

<style lang="postcss">
    .h1 {
        @apply text-[10px] font-bold my-2 max-sm:text-[8px] max-sm:my-1;
    }

    .h2 {
        @apply text-[8px] font-bold my-2 max-sm:text-[6px] max-sm:my-1;
    }

    .p {
        @apply text-[6px] font-medium my-0.5 max-sm:text-[4px] max-sm:my-0.5;
    }

    .hash {
        @apply opacity-60;
    }

    .a {
        @apply text-indigo-500;
    }

    .syntax {
        @apply text-gray-500;
    }

    .code {
        @apply bg-gray-900 px-[2px] py-[1px] rounded-[2px] text-red-500;
    }

    .bold {
        @apply font-bold;
    }
</style>