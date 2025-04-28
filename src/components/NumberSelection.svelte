<script lang="ts">
  let { value = $bindable() }: { value: number } = $props();
</script>

<input class="bg-white p-1" bind:value type="number" />
