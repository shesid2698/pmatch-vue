<template>
    <div class="camera-page">
        <div v-if="!image"
             class="camera-container">
            <video ref="video"
                   autoplay
                   playsinline
                   class="camera-preview"></video>
            <button @click="takePhoto">拍照</button>
        </div>

        <div v-else
             class="cropper-container">
            <Cropper class="cropper"
                     :src="image"
                     :stencil-props="{
          aspectRatio: 4/3
        }"
                     ref="cropperRef" />
            <button @click="saveCrop">儲存</button>
        </div>
        <!-- 預覽裁切後的圖片 -->
        <div v-if="croppedImage"
             class="preview-container">
            <img :src="croppedImage"
                 alt="裁切預覽"
                 class="preview-image" />
            <button @click="retake">重新拍攝</button>
        </div>
    </div>
</template>

<script setup>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const video = ref(null);
const image = ref(null);
const coordinates = ref(null);
const croppedImage = ref(null);
const croppedFile = ref(null);
const cropperRef = ref(null);
const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        video.value.srcObject = stream;
    } catch (err) {
        console.error('相機存取錯誤:', err);
    }
};

const takePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;
    canvas.getContext('2d').drawImage(video.value, 0, 0);
    image.value = canvas.toDataURL();
};

const saveCrop = () => {
    if (!cropperRef.value) return;
    const { canvas } = cropperRef.value.getResult();
    // 轉換為 base64 用於預覽
    croppedImage.value = canvas.toDataURL('image/jpeg');
    // 轉換為 File 物件
    canvas.toBlob(
        blob => {
            const fileName = `cropped-image-${Date.now()}.jpg`;
            croppedFile.value = new File([blob], fileName, { type: 'image/jpeg' });
        },
        'image/jpeg',
        0.9
    );
};
// 重新拍攝
const retake = () => {
    image.value = null;
    croppedImage.value = null;
    croppedFile.value = null;
    startCamera(); // 重新啟動相機
};
onMounted(() => {
    startCamera();
});
</script>
