<script>
    import "../../../app.css";

    let content = {
        type: 1,
        name: "",
        link: ""
    }

    function uploadContent() {
        const contentData = JSON.stringify(content);
        console.log(contentData);
    }
</script>

<main class="flex justify-center items-center h-full">
    <div class="glass-form">
        <div class="w-full">
            <h2 class="text-7xl mb-12">Add content</h2>
            <p>Type</p>
            <select bind:value={content.type} class="select mb-4 pl-3">
                <option value="youtube">Youtube</option>
                <option value="spotify">Spotify</option>
            </select>  
            <p>Name</p>   
            <input class="input mb-4 pl-3" bind:value={content.name} title="Name" type="text" placeholder="Name" />
            <p>Link</p>
            <input class="input mb-4 pl-3" bind:value={content.link} title="Link" type="url" placeholder="https://youtu.be/xvFZjo5PgG0?si=39IIZwcvdokOdE3R" />

        </div>
        <div class="flex flex-col">
            <button type="button" on:click={uploadContent} class="btn variant-filled m-4">Add</button>
        </div>
    </div>
</main>