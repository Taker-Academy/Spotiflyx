<script>
    import { goto } from "$app/navigation";
    import "../../app.css";

    let user = {
        email: "",
        password: ""
    }

    function login() {
        const userData = JSON.stringify(user);
        console.log(userData);
        goto("/home");
    }
</script>

<main class="flex justify-center items-center h-full">
    <div class="glass-form">
        <div class="w-full">
            <h2 class="text-7xl mb-12">Login</h2>
            <input class="input mb-4 pl-3" bind:value={user.email} title="Input (email)" type="email" placeholder="john@example.com" autocomplete="email" />
            <input class="input mb-4 pl-3" bind:value={user.password} title="Input (password)" type="password" placeholder="password" />
        </div>
        <div class="flex flex-col">
            <button type="button" on:click={login} class="btn variant-filled m-4">Login</button>
            <p class="mx-auto">Don't have an account ? <a href="/register">Register</a></p>
        </div>
    </div>
</main>