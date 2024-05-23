<script lang="ts">
	import LastUpload from '../../lib/LastUpload.svelte';
	import Search from '../../lib/Search.svelte';
	import Favorite from '../../lib/Favorite.svelte';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	let tabSet: number = 0;
</script>



<TabGroup justify="justify-center" class="bg-surface-400">
	<Tab bind:group={tabSet} name="tab1" value={0}><img src="/home.svg" alt="home" class="icon"/></Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}><img src="/search_icon.svg" alt="search" class="icon"/></Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}><img src="/favorite.svg" alt="Favorite" class="icon"/></Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<LastUpload></LastUpload>
		{:else if tabSet === 1}
			<Search></Search>
		{:else if tabSet === 2}
			<Favorite></Favorite>
		{/if}
	</svelte:fragment>
</TabGroup>
			


			