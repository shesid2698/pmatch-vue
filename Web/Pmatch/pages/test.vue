<template>
    <div class="w-80% m-y-0 m-x-auto">
        <div class="flip-container">
            <div class="flip-card">
                <div class="flip-card-front">
                    <!-- 前面的圖片 -->
                    <img src="/images/2025/21186e6643a9046b10830fee3cc823c0.jpg"
                         alt="Front Image">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
<style scoped>
.flip-container {
    width: 300px;
    aspect-ratio: 1/1;
    perspective: 1000px; /* 設置3D視角 */
}

.flip-card {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateY(45deg);
}

.flip-card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; /* 隱藏背面 */
    border-radius: 20px;
    overflow: hidden;
}

.flip-card-front {
    background-color: #fff;
}
</style>
