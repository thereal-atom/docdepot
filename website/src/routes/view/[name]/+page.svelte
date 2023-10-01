<script>
	import Markdown from "$lib/components/Markdown.svelte";

    export let data;
    
    const { document } = data;

</script>

<div class="min-h-screen py-16 px-96">
    <Markdown of={document.htmlString} />
</div>