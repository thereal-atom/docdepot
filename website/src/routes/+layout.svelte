<script>
	import Github from "$lib/components/icons/Github.svelte";
	import Twitter from "$lib/components/icons/Twitter.svelte";
    import "../app.css";
</script>

<div class="flex flex-col w-full min-h-screen h-full">
    <div class="flex flex-col items-center w-full">
        <div class="nav-bar flex flex-row items-center justify-between w-full py-12 px-72 bg-[#191B21] border-b border-solid border-white border-opacity-5">
            <a
                class="text-xl"
                href="/"
            >
                <p class="font-black">DocDepot</p>
            </a>
            <div class="flex flex-row items-center">
                <a
                    href="/upload"
                >
                    Upload
                </a>
                <a
                    href="/edit"
                >
                    Edit
                </a>
                <a
                    href="/guide"
                >
                    Guide
                </a>
            </div>
            <div class="w-20"></div>
        </div>
    </div>
    <slot />
    <div class="footer flex flex-row justify-center items-center w-full py-8 border-t border-solid border-white border-opacity-5">
        <div class="socials flex flex-row">
            <a href="https://twitter.com/oscarfalll">
                <Twitter />
            </a>
            <a href="https://github.com/thereal-atom/docdepot">
                <Github />
            </a>
        </div>
        <div class="links flex flex-row ml-8">
            <a href="/">Home</a>
            <a href="/guide">Guide</a>
            <a href="/upload">Upload</a>
        </div>
    </div>
</div>

<style lang="postcss">
    .nav-bar a {
        @apply font-semibold mr-8;
    }

    .footer .socials a {
        @apply w-6 mx-2;
    }

    .footer .links a {
        @apply mx-4 font-semibold;
    }
</style>