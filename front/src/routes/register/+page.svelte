<script>
    import { goto } from "$app/navigation";
    import "../../app.css";

    let user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    function register() {
        const userData = JSON.stringify(user);
        console.log(userData);
        goto("/home");
    }
</script>

<main class="flex justify-center items-center h-full">
    <div class="glass-form">
        <div class="w-full">
            <h2 class="text-7xl mb-12">Register</h2>
            <input class="input mb-4 pl-3" bind:value={user.firstName} title="Input (text)" type="text" placeholder="First Name" />
            <input class="input mb-4 pl-3" bind:value={user.lastName} title="Input (text)" type="text" placeholder="Last Name" />
            <input class="input mb-4 pl-3" bind:value={user.email} title="Input (email)" type="email" placeholder="john@example.com" autocomplete="email" />
            <input class="input mb-4 pl-3" bind:value={user.password} title="Input (password)" type="password" placeholder="password" />
        </div>
        <div class="flex flex-col">
            <button type="button" on:click={register} class="btn variant-filled m-4">Register</button>
            <p class="mx-auto">Already have an account ? <a href="/login">Login</a></p>
        </div>
    </div>
</main>