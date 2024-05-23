<script type="ts">
    import "../app.css";
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import SearchResult from '$lib/Result.svelte';

    let tabSet = 0;
    let searchValue = '';

</script>

<TabGroup
    justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded="rounded"
    border=""
	class="bg-surface-100-800-token w-full"
>
	<Tab bind:group={tabSet} name="tab1" value={0}>
        <img src="/youtube.svg" alt="YouTube" class="search-icon"/>
    </Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>
        <img src="/spotify.svg" alt="Spotify" class="search-icon"/>
    </Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<SearchResult {searchValue}></SearchResult>
		{:else if tabSet === 1}
            <SearchResult {searchValue}></SearchResult>
		{/if}
	</svelte:fragment>
</TabGroup>