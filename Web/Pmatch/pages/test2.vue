<script setup>
const url = useRequestURL()
const count = useState('count',()=>10)
</script>

<template>
  <div class="w-70% m-auto mt-3%">
    <h2>pathname:{{ url.pathname }}</h2>
    <button @click="count++">{{ count }}</button>
  </div>
</template>
