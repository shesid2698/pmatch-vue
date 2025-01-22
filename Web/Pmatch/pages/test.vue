<template>
    <div class="w-80% m-y-0 m-x-auto">
        <div class="bg-red">
            <div class="box">
                <div>123456</div>
                <div>789</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
</script>
<style scoped>
.box {
    box-sizing: border-box;
    width: fit-content;
    aspect-ratio: 3/2;
    color: white;
    position: relative;
    padding: 8px;
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-width: 3px;
        border-style: solid;
        border-color: transparent;
        background-image: linear-gradient(to right, #68e2ff, #4253eb, #d851ff);
        background-origin: border-box;
        mask-image: linear-gradient(white, white), linear-gradient(white, white);
        mask-clip: padding-box, border-box;
        mask-composite: exclude, add;
    }
}

</style>
