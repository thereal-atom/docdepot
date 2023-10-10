<script>
    import Markdown from "$lib/components/Markdown.svelte";
	import ViewMarkdown from "$lib/components/ViewMarkdown.svelte";
    import guideMarkdownString from "$lib/components/guide.md?raw";

    // TODO: make sure guide is all sound
</script>

<ViewMarkdown>
    <Markdown of={guideMarkdownString} />
</ViewMarkdown>