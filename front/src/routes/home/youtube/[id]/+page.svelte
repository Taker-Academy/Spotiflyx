<script>
    export let data;

    let videoId = data.id
</script>

<main class="h-full">
    <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full h-4/6"
    ></iframe>
    <div class="flex justify-around items-center h-2/6 variant-glass-primary">
        <button class="btn variant-filled m-4">
            <img src="/like.svg" alt="like" class="btn-icon">
        </button>
        <button class="btn variant-filled m-4">
            <img src="/favorite.svg" alt="favorite" class="btn-icon">
        </button>
    </div>
</main>