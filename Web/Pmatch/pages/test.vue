<template>
  <div class="image-editor">
    <!-- 電腦上傳區域 -->
    <div v-if="!image" class="upload-container">
      <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden" />
      <button @click="triggerFileInput" class="upload-btn">
        選擇圖片
      </button>

      <!-- 如果要支援拖放上傳 -->
      <div class="drop-zone" @drop.prevent="handleDrop" @dragover.prevent @dragenter.prevent>
        或將圖片拖曳至此
      </div>
    </div>

    <!-- 裁切區域 -->
    <div v-else class="cropper-container">
      <Cropper class="cropper" :src="image" :stencil-props="{ aspectRatio: 4 / 3 }" @change="onChange" ref="cropperRef" />
      <div class="button-group">
        <button @click="saveCrop" class="action-btn">確認裁切</button>
        <button @click="cancelCrop" class="action-btn cancel">取消</button>
      </div>
    </div>

    <!-- 預覽區域 -->
    <div v-if="croppedImage" class="preview-container">
      <img :src="croppedImage" alt="裁切預覽" class="preview-image" />
      <div class="button-group">
        <button @click="confirmCrop" class="action-btn">使用此圖</button>
        <button @click="resetCrop" class="action-btn cancel">重新裁切</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const fileInput = ref(null);
const image = ref(null);
const cropperRef = ref(null);
const croppedImage = ref(null);
const croppedFile = ref(null);

// 觸發檔案選擇
const triggerFileInput = () => {
  fileInput.value.click();
};

// 處理檔案上傳
const handleFileUpload = event => {
  const file = event.target.files[0];
  if (file) {
    loadImage(file);
  }
};

// 處理拖放上傳
const handleDrop = event => {
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    loadImage(file);
  }
};

// 載入圖片
const loadImage = file => {
  const reader = new FileReader();
  reader.onload = e => {
    image.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// 裁切圖片
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

// 取消裁切
const cancelCrop = () => {
  image.value = null;
  croppedImage.value = null;
  croppedFile.value = null;
};

// 重新裁切
const resetCrop = () => {
  croppedImage.value = null;
  croppedFile.value = null;
};

// 確認使用裁切後的圖片
const confirmCrop = () => {
  // 這裡可以處理確認後的邏輯，例如上傳到伺服器
  console.log('最終檔案:', croppedFile.value);
};

// 變更裁切區域時的處理
const onChange = ({ coordinates }) => {
  console.log('裁切座標:', coordinates);
};
</script>

<style scoped>
.image-editor {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.upload-container {
  text-align: center;
  padding: 20px;
}

.hidden {
  display: none;
}

.drop-zone {
  border: 2px dashed #ccc;
  padding: 40px;
  margin-top: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  cursor: pointer;
}

.drop-zone:hover {
  border-color: #999;
  background: #f0f0f0;
}

.cropper-container {
  margin: 20px 0;
}

.cropper {
  height: 400px;
  background: #000;
}

.preview-container {
  margin-top: 20px;
  text-align: center;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.action-btn {
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #45a049;
}

.action-btn.cancel {
  background: #666;
}

.action-btn.cancel:hover {
  background: #555;
}

.upload-btn {
  padding: 12px 24px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.upload-btn:hover {
  background: #1976d2;
}
</style>
