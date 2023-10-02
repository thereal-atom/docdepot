<script>
	import Markdown from "$lib/components/Markdown.svelte";

    export let data;
    
    const { document } = data;

</script>

<div class="flex flex-col items-center min-h-screen py-16 max-sm:py-4">
    <div class="w-[1024px] px-2 max-lg:w-full max-lg:px-24 max-sm:px-8">
        <Markdown of={document.htmlString} />
    </div>
</div>