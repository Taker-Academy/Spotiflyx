<script>
    import { goto } from "$app/navigation";
    import "../../../app.css";

    function disconnect() {
        goto("/login");
    }

</script>

<main>
    <h1 class="text-9xl">Hello</h1>
    <button on:click={disconnect}>Disconnect</button>
</main>