<script>
	import Hero from "$lib/components/Hero.svelte";

    // TODO: add features section
    // TODO: add contact us section
    // TODO: maybe add FAQ
</script>

<div class="flex flex-col">
    <div class="main relative flex flex-col items-center justify-center w-full h-screen max-xl:h-fit max-xl:py-32 max-lg:py-24 max-md:h-5/6 max-md:px-8">
        <div class="z-10 flex flex-col items-center">
            <h1 class="text-5xl font-black text-center max-lg:text-4xl max-md:text-3xl max-[400px]:text-xl">Share your knowledge</h1>
            <p class="mt-4 text-lg font-semibold opacity-60 text-center max-md:text-base max-sm:text-sm">Upload your Markdown text to create a beautiful and shareable document, without any coding knowledge required.</p>
            <a
                class="bg-blue-500 mt-4 px-6 py-2 rounded-md font-bold max-sm:text-sm"
                href="/upload"
            >
                Upload Markdown
            </a>
            <Hero />
        </div>

        <!-- TODO: REFACTOR BRO WTF IS THIS. but it works so fine for now. -->
        <div class="opacity-60 max-xl:opacity-10">
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-medium left-20 max-lg:left-12 top-[100px] rotate-[-15deg]"><span class="opacity-20">1.</span> an ordered list</p>
            <p class="absolute opacity-80 text-lg max-lg:text-sm font-medium left-48 max-lg:left-16 top-[200px] rotate-[15deg] py-8 pl-8 pr-12 rounded-md border-l-4 border-white border-opacity-20 bg-white bg-opacity-[5%]"><span class="opacity-20">{">"}</span> block quotes :0</p>
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-medium left-20 max-lg:left-12 top-[350px]">paragraph</p>
            <p class="absolute opacity-60 text-3xl max-lg:text-2xl font-bold left-32 max-lg:left-8 top-[450px] -rotate-[15deg]"><span class="opacity-20">#</span> heading 1</p>
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-bold left-28 max-lg:left-8 top-[600px] max-lg:top-[550px]"><span class="opacity-20">[</span><span class="text-indigo-500">link</span><span class="opacity-20">](</span>docdepot.vercel.app<span class="opacity-20">)</span></p>
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-bold left-20 max-lg:left-12 top-[700px] max-lg:top-[620px] rotate-[15deg]"><span class="opacity-20">*</span>italic text<span class="opacity-20">*</span></p>
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-bold left-48 top-[800px] max-lg:top-[640px] -rotate-[15deg] max-lg:rotate-0"><span class="opacity-20">-</span> another list</p>
    
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-bold right-20 max-lg:right-12 top-[100px] rotate-[15deg]"><span class="opacity-20">**</span>bold text<span class="opacity-20">**</span></p>
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-bold right-32 max-lg:right-8 top-[250px] -rotate-[15deg]"><span class="opacity-20">![</span><span class="text-indigo-500">image</span><span class="opacity-20">](</span>imgur.com/wow<span class="opacity-20">)</span></p>
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-bold right-28 max-lg:right-4 top-[350px] p-6 bg-white bg-opacity-[5%] rounded-md"><span class="opacity-20">```</span><br />// codeblocks<br /><span class="opacity-20">```</span></p>
            <p class="absolute opacity-60 text-2xl max-lg:text-xl font-bold right-56 max-lg:right-12 top-[580px] max-lg:top-[500px] rotate-[15deg]"><span class="opacity-20">##</span> heading 2</p>
            <p class="absolute opacity-60 text-lg max-lg:text-sm font-bold right-80 max-lg:right-12 top-[700px] max-lg:top-[600px]"><span class="opacity-20">`</span>code<span class="opacity-20">`</span></p>
            <p class="absolute opacity-60 text-xl max-lg:text-lg font-bold right-36 top-[820px] max-lg:top-[630px] -rotate-[15deg] max-lg:rotate-0"><span class="opacity-20">###</span> heading 3</p>
        </div>
    </div>
    <div class="flex flex-col justify-center py-16 px-8 bg-primary">
        <div class="flex flex-col mt-16 p-20 pb-28 bg-gradient-to-br from-[#260a6b] to-[#3B82F6] rounded-md">
            <h1 class="text-4xl font-bold">It takes only a few seconds.</h1>
            <div class="grid grid-cols-2 gap-y-16 mt-24">
                <div class="flex flex-col w-1/2">
                    <div class="w-fit p-3 bg-secondary rounded-md">
                        <img
                            class="w-7 h-7"
                            src="/icons/upload.svg"
                            alt="icon"
                        />
                    </div>
                    <h2 class="mt-2 font-bold text-xl">Upload Markdown</h2>
                    <p class="mt-2 font-semibold text-sm opacity-60">DocDepot allows you to upload your markdown text to make it available for anyone to view in a beautiful document. You don't even need any coding knowledge.</p>
                </div>
                <div class="flex flex-col w-1/2">
                    <div class="w-fit p-3 bg-secondary rounded-md">
                        <img
                            class="w-7 h-7"
                            src="/icons/edit.svg"
                            alt="icon"
                        />
                    </div>
                    <h2 class="mt-2 font-bold text-xl">Edit Markdown</h2>
                    <p class="mt-2 font-semibold text-sm opacity-60">Use our markdown editor to quickly draw up documents. Use keyboard shortcuts to increase your productivity and preview your document to be sure it looks perfect before your upload.</p>
                </div>
                <div class="flex flex-col w-1/2">
                    <div class="w-fit p-3 bg-secondary rounded-md">
                        <img
                            class="w-7 h-7"
                            src="/icons/chart.svg"
                            alt="icon"
                        />
                    </div>
                    <p class="w-fit mt-2 px-1 py-0.5 bg-primary text-[10px] font-bold rounded-md border border-white border-opacity-20">Coming Soon</p>
                    <h2 class="mt-2 font-bold text-xl">Document Analytics</h2>
                    <p class="mt-2 font-semibold text-sm opacity-60">Analytics provide you insights into your website's visitors, stay time and more.</p>
                </div>
                <div class="flex flex-col w-1/2">
                    <div class="w-fit p-3 bg-secondary rounded-md">
                        <img
                            class="w-7 h-7"
                            src="/icons/history.svg"
                            alt="icon"
                        />
                    </div>
                    <p class="w-fit mt-2 px-1 py-0.5 bg-primary text-[10px] font-bold rounded-md border border-white border-opacity-20">Coming Soon</p>
                    <h2 class="mt-2 font-bold text-xl">Version Control</h2>
                    <p class="mt-2 font-semibold text-sm opacity-60">View your documents' history and restore content even when you think you've lost it.</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col mt-16 p-20 bg-secondary rounded-md">
            <h1 class="text-4xl font-bold">Frequently Asked Questions</h1>
            <div class="flex flex-col mt-12">
                <p>None, because this tool is that easy to use ;).</p>
            </div>
        </div>
        <div class="flex flex-col items-center mt-16 py-48 px-16 bg-gradient-to-br from-[#260a6b] to-[#3B82F6] rounded-md">
            <p class="px-8 text-3xl font-bold text-center">Share your knowledge with the world. Upload your markdown now.</p>
            <a
                class="mt-4 px-6 py-2 bg-secondary rounded-md font-bold max-sm:text-sm"
                href="/upload"
            >
                Upload Markdown
            </a>
        </div>
        <!-- <div class="flex flex-col w-1/5 mx-4 p-4 rounded-md border border-white border-opacity-10">
            <div class="flex flex-row">
                <img
                    src=""
                    alt="icon"
                />
                <h2 class="ml-2 font-bold text-xl">Markdown Editor</h2>
            </div>
            <p class="font-semibold text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet praesentium, eum quaerat laboriosam facere distinctio ratione eaque velit atque ea dolores optio. Necessitatibus aut quae quam quisquam voluptas. Vitae, quam!</p>
        </div>
        <div class="flex flex-col w-1/5 mx-4 p-4 rounded-md border border-white border-opacity-10">
            <div class="flex flex-row">
                <img
                    src=""
                    alt="icon"
                />
                <h2 class="ml-2 font-bold text-xl">Analytics</h2>
                <p>Coming Soon</p>
            </div>
            <p class="font-semibold text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet praesentium, eum quaerat laboriosam facere distinctio ratione eaque velit atque ea dolores optio. Necessitatibus aut quae quam quisquam voluptas. Vitae, quam!</p>
        </div>
        <div class="flex flex-col w-1/5 mx-4 p-4 rounded-md border border-white border-opacity-10">
            <div class="flex flex-row">
                <img
                    src=""
                    alt="icon"
                />
                <h2 class="ml-2 font-bold text-xl">Version Control</h2>
                <p>Coming Soon</p>
            </div>
            <p class="font-semibold text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet praesentium, eum quaerat laboriosam facere distinctio ratione eaque velit atque ea dolores optio. Necessitatibus aut quae quam quisquam voluptas. Vitae, quam!</p>
        </div> -->
    </div>
</div>

<style lang="postcss">
    .main {
        background: radial-gradient(circle, rgba(38,10,107,1) 10%, rgba(1,9,18,1) 70%, rgba(1,9,18,1) 100%);
    }

    .sub {
        background: radial-gradient(circle, rgba(38,10,107,1) 5%, rgba(1,9,18,1) 40%, rgba(1,9,18,1) 100%);
    }
</style>