<template>
    <div>
        <Header />
        <div class="mt-140px mb-60px page">
            <NuxtPage />
        </div>
        <Footer />
    </div>
</template>

<style>
body{
    margin: 0;
    color: #555553;
}
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
.page{
    min-height: calc(100vh - 120px - 80px - 280px);
}
</style>
