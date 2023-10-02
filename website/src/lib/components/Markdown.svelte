<script lang="ts">
    import showdown from "showdown";
    const converter = new showdown.Converter();

    export let of: string;
</script>

<div class="md">
    {@html converter.makeHtml(of)}
</div>

<style lang="postcss">
    :global(.md h1) {
        @apply text-4xl font-bold my-8 max-lg:text-3xl max-lg:my-6 max-[330px]:text-2xl;
    }
    
    :global(.md h2) {
        @apply text-3xl font-bold my-6 max-lg:text-2xl max-lg:my-4 max-[330px]:text-xl;
    }
    
    :global(.md h3) {
        @apply text-2xl font-bold my-4 max-lg:text-xl max-[330px]:text-lg;
    }
    
    :global(.md p) {
        @apply font-medium my-2 opacity-80 max-lg:text-sm max-[330px]:text-xs;
    }
    
    :global(.md a) {
        @apply text-indigo-400 font-bold;
    }
    
    :global(.md ol) {
        @apply list-decimal ml-4;
    }
    
    :global(.md ul) {
        @apply list-disc ml-4;
    }
    
    :global(.md li) {
        @apply my-4 max-lg:text-sm max-lg:my-2 max-[330px]:text-xs;
    }
    
    :global(.md strong) {
        @apply font-black opacity-100;
    }
    
    :global(.md code) {
        @apply bg-gray-900 px-1 py-0.5 rounded-md text-red-500;
    }
    
    :global(.md img) {
        @apply my-4;
    }
</style>