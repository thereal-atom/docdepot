<script>
	import { enhance } from "$app/forms";
	import Hero from "$lib/components/Hero.svelte";
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

    // TODO: get rid of beta access/newsletter sections
    // TODO: add features section
    // TODO: add contact us section
    // TODO: maybe add FAQ
    // TODO: add CTA at the end
    // TODO: maybe add section in smaller containers like https://limitless.email
</script>

<div class="flex flex-col">
    <div class="main relative flex flex-col items-center justify-center w-full h-screen max-xl:h-fit max-xl:py-32 max-lg:py-24 max-md:h-5/6 max-md:px-8">
        <div class="z-10 flex flex-col items-center">
            <h1 class="text-5xl font-black text-center max-lg:text-4xl max-md:text-3xl max-[400px]:text-xl">Share your knowledge</h1>
            <p class="mt-4 text-lg font-semibold opacity-60 text-center max-md:text-base max-sm:text-sm">Upload your Markdown text to create a beautiful and shareable document, without any coding knowledge required.</p>
            <a class="bg-blue-500 mt-4 px-6 py-2 rounded-md font-bold max-sm:text-sm" href="#newsletter">Upload Markdown</a>
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
    <div
        id="newsletter"
        class="z-10 bg-primary flex flex-col items-center border-y border-white border-opacity-5 py-64 max-md:py-32 max-sm:py-16 max-sm:px-4"
    >
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
    <!-- <div class="sub flex flex-col items-center w-full py-64">
        <p class="px-8 text-3xl font-bold text-center">If you would like beta access, reach out on <a class="text-indigo-500" href="https://twitter.com/oscarfalll">twitter</a>.</p>
    </div> -->
</div>

<style lang="postcss">
    .main {
        background: radial-gradient(circle, rgba(38,10,107,1) 10%, rgba(1,9,18,1) 70%, rgba(1,9,18,1) 100%);
    }

    .sub {
        background: radial-gradient(circle, rgba(38,10,107,1) 5%, rgba(1,9,18,1) 40%, rgba(1,9,18,1) 100%);
    }
</style>