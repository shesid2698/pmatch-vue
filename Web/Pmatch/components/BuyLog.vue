<template>
    <div class="buyLogBox relative">
        <div class="flex items-center">
            <div class="flex items-center">
                <img class="w-25px" src="/images/buyLogIcon.png" alt="購買紀錄icon">
            </div>
            <div class="flex items-center ms-3">
                <span>
                    購買紀錄
                </span>
            </div>
        </div>
        <div class="buyLogDetailBox absolute top-100% right-0 color-#f72585">
            <div class="buyItem px-1.5rem py-.8rem">
                寶島前夫人
            </div>
            <div class="buyItem px-1.5rem py-.8rem">
                滿貫金流
            </div>
        </div>
    </div>
</template>
<script setup>

</script>

<style scoped>
    .buyLogBox{
        position: fixed;
        right: 0;
        top: 20%;
        background: linear-gradient(to right, #f72585, #7b2cbf);
        color: #fff;
        padding: 1rem 1.5rem;
        font-size: 18px;
        border-radius: 50px 0 0 50px;
        font-weight: 600;
        z-index: 99;
    }
    .buyLogDetailBox{
        box-shadow: 0px 0px 0px 1px #ccc;
        background: #fff;
    }
    .buyItem{
        border-bottom: 1px solid #f72585;
    }
</style>