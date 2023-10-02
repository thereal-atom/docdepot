<script>
	import { page } from "$app/stores";
    import Github from "$lib/components/icons/Github.svelte";
	import Twitter from "$lib/components/icons/Twitter.svelte";
	import { config } from "$lib/config";
    import "../app.css";
</script>

{#if config.NODE_ENV === "production"}
    <p class="p-12">womp womp no access yet lol. message me on twitter: <a class="text-indigo-500" href="https://twitter.com/oscarfalll">@oscarfalll</a></p>
{:else}
    <div class="flex flex-col w-full min-h-screen {$page.error ? "h-screen" : ""}  h-full">
        <div class="flex flex-col items-center w-full">
            <div class="nav-bar flex flex-row items-center justify-between w-full py-12 px-72 bg-primary border-b border-solid border-white border-opacity-5 max-lg:px-12 max-sm:flex-col max-sm:px-0 max-sm:py-8">
                <a
                    class="text-xl"
                    href="/"
                >
                    <p class="font-black">DocDepot</p>
                </a>
                <div class="flex flex-row items-center max-sm:mt-8">
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
                        href="/view/guide"
                    >
                        Guide
                    </a>
                </div>
                <div class="w-20"></div>
            </div>
        </div>
        {#if $page.error}
            <div class="w-screen h-full flex flex-col items-center justify-center">
                <h1 class="text-6xl text-indigo-500 font-bold">{$page.status}</h1>
                <p class="mt-4">{$page.error.message}</p>
            </div>
        {:else}
            <div class="h-full">
                <slot />
            </div>
        {/if}
        <div class="footer flex flex-row justify-center items-center w-full py-8 border-t border-solid border-white border-opacity-5 max-sm:flex-col-reverse">
            <div class="socials flex flex-row">
                <a href="https://twitter.com/oscarfalll">
                    <Twitter />
                </a>
                <a href="https://github.com/thereal-atom/docdepot">
                    <Github />
                </a>
            </div>
            <div class="links flex flex-row ml-8 max-sm:ml-0 max-sm:mb-8">
                <a href="/">Home</a>
                <a href="/guide">Guide</a>
                <a href="/upload">Upload</a>
            </div>
        </div>
    </div>
{/if}

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