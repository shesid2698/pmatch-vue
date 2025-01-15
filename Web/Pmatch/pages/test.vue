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
        <div class="bg-red">
            <div class="box">
                <div>123456</div>
                <div>789</div>
            </div>
        </div>
        <div class="box2">
            rotateY(45deg)
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
        border-width: 0;
        border-bottom-width: 3px;
        border-style: solid;
        border-color: transparent;
        background-image: linear-gradient(to right, #68e2ff, #4253eb, #d851ff);
        background-origin: border-box;
        mask-image: linear-gradient(white, white), linear-gradient(white, white);
        mask-clip: padding-box, border-box;
        mask-composite: exclude, add;
    }
}
.box2 {
    background: #2db34a;
    border-radius: 6px;
    height: 95px;
    width: 95px;
    line-height: 95px;
    text-align: center;
    color: white;
    font-size: 11px;
    transform: perspective(250px) rotateY(30deg);
    transition: 0.5s;
    &:hover{
      transform: perspective(250px) rotateY(40deg);
    }
}
</style>
