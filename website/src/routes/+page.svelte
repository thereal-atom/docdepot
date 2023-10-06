<script>
	import { enhance } from "$app/forms";
	// import { page } from "$app/stores";
	import { addToast } from "$lib/stores/toasts";

    $: loading = false;

    const handleSubscribe = () => {
        // this code is either really cool, or really shit, lol
        // the actual handling of the request is in '+page.server.ts'
        // this is done because it uses a server env variable (env.SECRET) so it shouldn't run on the client side
        // the result of the request is handled here
        // this is reminiscent of my architecture on the backend
        // where the router only handles the http stuff and the controller handles business logic and so on
        // but here the page.server handles the fetch stuff and the form handles the response stuff
        // again, either really cool or just shit lmao

        loading = true;

        return async ({
            result,
            update,
        }) => {
            addToast(
                result.type === "success" ? {
                    title: "Subscribed successfully",
                    message: "Look out in your inbox for updates!",
                    type: "success",
                }
                : result.type === "error" ? {
                    title: "There was an error subscribing",
                    message: result.error.message,
                    type: "error",
                }
                : {
                    title: "Unknown Error",
                    message: "There was an unknown error.",
                    type: "error",
                }
            );

            loading = false;

            if (result.type !== "error") update();
        };
    };

    // $: innerWidth = 0;
</script>

<!-- <svelte:window bind:innerWidth/> -->

<div class="flex flex-col min-h-screen">
    <div class="flex flex-col items-center min-h-screen max-sm:min-h-fit bg-gradient-to-br from-[#7353BA] to-[#2F195F]">
        <div class="flex flex-col items-center py-16">
            <h1 class="text-5xl font-black max-lg:text-4xl max-sm:text-2xl">Publish Your Knowledge</h1>
            <p class="mt-4 text-gray-300 text-xl font-bold text-center max-lg:text-base max-sm:text-sm max-sm:px-4">Upload your markdown files to make them available for everyone to see. It literally takes one step.</p>
            <div class="font-bold max-lg:text-sm max-sm:text-xs">(you don't even need to login)</div>
            <a
                href="/upload"
                class="mt-4 px-4 py-2 bg-primary font-bold rounded-md max-sm:text-sm"
            >
                Upload Markdown
            </a>
            <!-- {#if innerWidth > 768}
                <img
                    class="w-[1280px] mt-16 rounded-md max-xl:w-[1024px] max-lg:w-[768px] max-md:hidden"
                    src="/hero-image.webp"
                    alt="hero"
                />
            {:else}
                <img
                    class="w-[640px] mt-12 px-8 rounded-md md:hidden max-sm:mt-24 max-sm:w-[500px] max-[500px]:w-[380px] max-[380px]:w-[320px] max-[320px]:w-[280px]"
                    src="/hero-image-small.webp"
                    alt="hero"
                />
            {/if} -->
        </div>
    </div>
    <div class="flex flex-col items-center my-64 max-md:my-32 max-sm:my-16 max-sm:px-4">
        <p class="text-2xl font-bold text-center max-sm:text-sm">Join the email newsletter to stay tuned for updates.</p>
        <form
            class="flex flex-row max-sm:flex-col max-sm:w-full"
            method="POST"
            use:enhance={handleSubscribe}
        >
            <input
                class="mt-4 px-4 py-3 bg-inherit font-bold rounded-md border  border-white border-opacity-10"
                placeholder="Your Email Address"
                type="text"
                name="email"
                required
            />
            <button
                class="mt-4 ml-4 px-4 py-2 bg-indigo-500 font-bold rounded-md max-sm:ml-0 disabled:opacity-40"
                disabled={loading}
            >
                Sign Up
            </button>
        </form>
    </div>
    <div class="flex flex-col items-center w-full my-32 px-8 max-md:my-16">
        <p class="text-3xl font-bold text-center">If you would like beta access, reach out on <a class="text-indigo-500" href="https://twitter.com/oscarfalll">twitter</a>.</p>
    </div>
</div>