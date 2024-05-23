<script>
    export let data;

    let MusicId = data.id
</script>

<main class="h-full">
    <iframe 
        src={`https://open.spotify.com/embed/track/${MusicId}`} 
        title="Spotify music player"
        class="w-full h-4/6"
        frameborder="0" 
        allow="encrypted-media">
    </iframe>
    <div class="flex justify-around items-center h-2/6 variant-glass-primary">
        <button class="btn variant-filled m-4">
            <img src="/like.svg" alt="like" class="btn-icon">
        </button>
        <button class="btn variant-filled m-4">
            <img src="/favorite.svg" alt="favorite" class="btn-icon">
        </button>
    </div>
</main>