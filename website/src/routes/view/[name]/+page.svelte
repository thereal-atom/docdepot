<script>
	import Markdown from "$lib/components/Markdown.svelte";
	import ViewMarkdown from "$lib/components/ViewMarkdown.svelte";

    export let data;
    
    const { document } = data;
</script>

<ViewMarkdown><Markdown of={document.htmlString} /></ViewMarkdown>