<template>
    <div class="mt-50px">
        <el-button plain
                   @click="dialogVisible = true"
                   class="cursor-pointer">
            Click to open the Dialog
        </el-button>

        <el-dialog v-model="dialogVisible"
                   title="Tips"
                   width="500"
                   :before-close="handleClose">
            <span>This is a message</span>
            <template #footer>
                <div class="dialog-footer text-center">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary"
                               @click="dialogVisible = false">
                        卻關
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

const dialogVisible = ref(false);
</script>
