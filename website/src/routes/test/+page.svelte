<script>
    import Markdown from "$lib/components/Markdown.svelte";
	import ViewMarkdown from "$lib/components/ViewMarkdown.svelte";
    import testMarkdownString from "$lib/components/test.md?raw";
</script>

<ViewMarkdown>
    <Markdown of={testMarkdownString} />
</ViewMarkdown>