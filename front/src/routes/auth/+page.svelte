<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('access_token');
        if (token) {
            localStorage.setItem('token', token);
        }
    });
</script>