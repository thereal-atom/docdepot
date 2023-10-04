<script lang="ts">
	import { page } from "$app/stores";
    import { api } from "$lib/api";
	import { config } from "$lib/config";
	import { addToast } from "$lib/stores/toasts";

    $: loading = false;

    const signUpToNewsletter = (e: any) => {
        loading = true;

        const formData = new FormData(e.target);

        api.newsletter.signup
            .create({ email: formData.get("email").toString() })
            .then(() => {
                addToast({
                    title: "Subscribed successfully",
                    message: "Look out in your inbox for updates!",
                    type: "success",
                });

                loading = false;
            })
            .catch(err => {
                addToast({
                    title: "There was an error subscribing",
                    message: err.message,
                    type: "error",
                });

                loading = false;
            });
    };
</script>

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
            <img
                class="w-3/4 mt-16 rounded-md max-xl:w-full max-xl:px-8 max-md:hidden"
                src="/hero-image.png"
                alt="hero"
            />
            <img
                class="w-full mt-12 px-8 rounded-md md:hidden max-sm:mt-24"
                src="/hero-image-small.png"
                alt="hero"
            />
        </div>
    </div>
    <div class="flex flex-col items-center my-64 max-md:my-32 max-sm:my-16 max-sm:px-4">
        <p class="text-2xl font-bold text-center max-sm:text-sm">Join the email newsletter to stay tuned for updates.</p>
        <form
            class="flex flex-row max-sm:flex-col max-sm:w-full"
            on:submit|preventDefault={signUpToNewsletter}
        >
            <input
                class="mt-4 px-4 py-3 bg-inherit font-bold rounded-md border border-solid border-white border-opacity-5"
                placeholder="Your Email Address"
                type="text"
                name="email"
            />
            <button
                class="mt-4 ml-4 px-4 py-2 bg-[#7353BA] font-bold rounded-md max-sm:ml-0 disabled:opacity-40"
                disabled={loading}
            >
                Sign Up
            </button>
        </form>
    </div>
</div>