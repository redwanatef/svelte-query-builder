<script lang="ts">
  let { value = $bindable() }: { value: number } = $props();
</script>

<input bind:value type="number" />
