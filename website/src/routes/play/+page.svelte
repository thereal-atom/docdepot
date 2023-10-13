<script>
    $: lines = [
        ""
    ];
</script>

<div class="flex flex-col p-16">
    <h1 class="text-3xl font-bold">Play</h1>
    <div
        class="flex flex-col mt-8 p-8 rounded-md border border-white border-opacity-10"
        contenteditable
        on:input={e => {
            e.preventDefault();

            lines = e.target.innerText.split("\n");
        }}
    >
        {#each lines as line}
            <div>{line}</div>
        {/each}
    </div>
</div>