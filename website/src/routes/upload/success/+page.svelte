<script lang="ts">
    import { page } from "$app/stores";

    $: name = $page.url.searchParams.get("name");
</script>

<div class="flex flex-col h-full p-16 max-[330px]:px-8">
    <h1 class="text-4xl font-bold max-sm:text-3xl">Success!</h1>
    <p class="font-semibold mt-2 max-sm:text-sm">Your markdown document is now public. View it here: <a class="text-indigo-500" href="/view/{name}">{$page.url.host}/view/{name}</a></p>
    <div class="flex flex-row mt-4 max-sm:flex-col">
        <a
            class="px-4 py-3 bg-indigo-500 rounded-md font-bold max-sm:w-fit max-sm:text-sm"
            href="/upload"
        >
            Upload Another Document
        </a>
        <a
            class="ml-4 px-4 py-3 bg-indigo-500 rounded-md font-bold max-sm:ml-0 max-sm:mt-2 max-sm:w-fit max-sm:text-sm"
            href="/edit"
        >
            Edit Markdown
        </a>
    </div>
</div>