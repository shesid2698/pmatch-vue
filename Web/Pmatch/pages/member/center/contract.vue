<template>
    <div class="ccontainer w-90% lg:w-70%">
        <div class="lg:w-160px">
            <MemberCenter></MemberCenter>
        </div>
        <div class="flex-1 md:pl-20px">
            <div class="flex justify-between">
                <label for="isMember"
                       class="text-18px cursor-pointer text-[#808080] p-x-10px pb-5px"
                       :class="{show:Type=='isMember'}">已簽約
                    <input type="radio"
                           id="isMember"
                           value="isMember"
                           v-model="Type"
                           hidden></label>
                <label for="IsConfirming"
                       class="text-18px cursor-pointer text-[#808080] p-x-10px pb-5px"
                       :class="{show:Type=='IsConfirming'}">簽約中
                    <input type="radio"
                           id="IsConfirming"
                           value="IsConfirming"
                           v-model="Type"
                           hidden></label>
                <label for="Canceled"
                       class="text-18px cursor-pointer text-[#808080] p-x-10px pb-5px"
                       :class="{show:Type=='Canceled'}">已取消
                    <input type="radio"
                           id="Canceled"
                           value="Canceled"
                           v-model="Type"
                           hidden></label>
            </div>
        </div>
    </div>
</template>
<script setup>
const Type = ref('isMember');
const wade = ref('show');
</script>
<style scoped>
.ccontainer {
    height: fit-content;
    display: flex;
    margin: 0 auto;
}
.show {
    color: #3D8DCC;
    border-bottom: 3px solid #3D8DCC;
}
</style>
