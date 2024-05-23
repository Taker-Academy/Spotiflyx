<script>
  import { goto } from "$app/navigation";
    import "../app.css";

    export let searchValue = '';
    let videoId = '7qiZfU4dY1lWllzX7mPBI3';
    let range = Array.from({length: 20}, (_, i) => i);
    let contentType = 'spotify';
    let image = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';

    function gotoContentPage() {
        if (contentType === 'youtube') {
            goto(`/home/youtube/${videoId}`);
        } else {
            goto(`/home/spotify/${videoId}`);
        }
    }
</script>

<div class="max-h-screen overflow-x-auto h-full min-h-screen  pb-48">
    {#each range as number}
        <div class="block card card-hover p-4 m-4 mx-auto h-80 w-96 bg-surface-400" 
            on:click={gotoContentPage} 
            on:keydown={gotoContentPage} 
            role="button" 
            tabindex="0">
            <img src={image} alt="video thumbnail" class="w-full rounded-lg">
            <p>{searchValue}</p>
        </div>
    {/each}
</div>
