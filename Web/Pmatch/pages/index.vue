<template>
    <div>
        <div class="max-w-1320px m-auto ps-5 pe-5">
            <div class="mb-3">
                <h1 class="m-0 text-center">最安全的遊戲交易平台</h1>
            </div>
            <div class="mb-3">
                <select>
                    <option>選擇遊戲...</option>
                </select>
            </div>
            <div class="mb-3">banner</div>
            <div class="mb-3">
                <div class="flex">
                    <div class="w-full">
                        <div class="p-3">滿貫大亨圖</div>
                        <div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 滿貫金流</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 希望之花</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 發大財金庫</NuxtLink
                                >
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="p-3">滿貫大亨圖</div>
                        <div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 滿貫金流</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 希望之花</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 發大財金庫</NuxtLink
                                >
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="p-3">滿貫大亨圖</div>
                        <div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 滿貫金流</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 希望之花</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 發大財金庫</NuxtLink
                                >
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="p-3">滿貫大亨圖</div>
                        <div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 滿貫金流</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 希望之花</NuxtLink
                                >
                            </div>
                            <div>
                                <NuxtLink
                                    class="color-#666 decoration-none"
                                    to="/"
                                    >* 發大財金庫</NuxtLink
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end pt-3 pb-3">
                    <div class="">
                        <NuxtLink class="color-#666 decoration-none" to="/"
                            >more ..</NuxtLink
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-#eee pt-5 pb-5">
            <div class="max-w-1320px m-auto ps-5 pe-5">
                <div>
                    <h2 class="m-0 text-center">NEWS</h2>
                    <h1 class="m-0 text-center">最新消息</h1>
                </div>
                <div class="flex">
                    <div class="w-75%">
                        <NuxtLink
                            :to="item.link"
                            v-for="item in news"
                            :key="item.id"
                        >
                            <div class="w-full">
                                <div class="w-100">
                                    <div>
                                        <span>{{ item.date }}</span>
                                    </div>
                                    <div>{{item.category === 1 ? '網站公告' : item.category === 2 ? '活動資訊' : ''}}</div>
                                </div>
                                <div class="w-full">
                                    <div>
                                        <h2>{{item.title}}</h2>
                                        <h3>{{item.subtitle}}</h3>
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="w-25%"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElButton } from "element-plus";

const news = [
    {
        date: "2024-09-30",
        category: 1,
        title: "test111",
        subtitle: "sub111",
    },
    {
        date: "2024-09-42",
        category: 2,
        title: "test111",
        subtitle: "sub111",
    },
];
</script>

<style scoped>
</style>
