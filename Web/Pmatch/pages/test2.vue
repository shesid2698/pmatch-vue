<script setup>
const url = useRequestURL()
</script>

<template>
  <div>
    <h2>pathname:{{ url.pathname }}</h2>
  </div>
</template>
