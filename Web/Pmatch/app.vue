<template>
    <div>
        <Header />
        <div class="mt-100px">
            <NuxtPage />
        </div>
    </div>
</template>

<style>
.el-tabs--card > .el-tabs__header .el-tabs__item {
    background-color: #fff;
    color: #212529;
    border-bottom: none;
    border-radius: 5px;
    padding: 1.5rem;
}
.el-tabs--card > .el-tabs__header .el-tabs__item:hover {
    background-color: #000;
    border-bottom: none;
    border-radius: 5px;
    color: #fff;
    padding: 1.5rem;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #212529;
    border-bottom: none;
    border-radius: 5px;
    color: #fff;
    padding: 1.5rem;
}
.el-tabs--card > .el-tabs__header {
    border-bottom: none !important;
    margin: 0 0 10px 0;
}
</style>
