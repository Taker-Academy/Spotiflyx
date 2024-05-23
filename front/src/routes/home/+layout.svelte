<script>
    import "../../app.css";
    import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar class="custom-appbar">
    <svelte:fragment slot="lead">
        <a href="/home">
            <img src="/logo.png" alt="Spotiflix logo" class="big-icon ml-8"/>
        </a>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <a href="/home/add">
            <img src="/add.svg" alt="add" class="big-icon"/>
        </a>
        <a href="/home/user">
            <img src="/user.svg" alt="user" class="big-icon mr-8"/>
        </a>
    </svelte:fragment>
</AppBar>
<slot></slot>