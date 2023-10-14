<script>
    import Markdown from "$lib/components/Markdown.svelte";
	import ViewMarkdown from "$lib/components/ViewMarkdown.svelte";
    import useCasesMarkdownString from "$lib/components/use-cases.md?raw";
</script>

<ViewMarkdown>
    <Markdown of={useCasesMarkdownString} />
</ViewMarkdown>