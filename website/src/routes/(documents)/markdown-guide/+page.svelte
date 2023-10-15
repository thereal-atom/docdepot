<svelte:head>
    <title>DocDepot - Markdown Guide</title>
</svelte:head>

<script>
    import Markdown from "$lib/components/Markdown.svelte";
	import ViewMarkdown from "$lib/components/ViewMarkdown.svelte";
    import markdownGuideMarkdownString from "$lib/components/markdown-guide.md?raw";
</script>

<ViewMarkdown>
    <Markdown of={markdownGuideMarkdownString} />
</ViewMarkdown>