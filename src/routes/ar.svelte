<script>
    import { onMount } from "svelte";
    import App from '$lib/threejs/arPortfolio.js'

    onMount(() => {
        const app = new App();
        window.app = app;
    })
</script>

