<template>
    <div class="ccontainer w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 pl-20px">
            <el-button @click="show = !show">Click Me</el-button>
            <el-collapse-transition>
                <div v-show="show"
                     style="height: 400px">
                    <div class="transition-box">el-collapse-transition</div>
                    <div class="transition-box">el-collapse-transition</div>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
const show = ref(false);
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
</style>
