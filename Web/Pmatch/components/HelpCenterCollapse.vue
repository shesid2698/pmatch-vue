<template>
  <div class="demo-collapse" v-for="item of helpCenterTitle" :key="item.key">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="item.title" :name="item.name">
        <div>
          <component :is="item.component" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>

const activeNames = ref(['1'])
const handleChange = (val) => {
}
const helpCenterTitle = [
  {
    title: "登入問題",
    name: "1",
    component: resolveComponent("HelpLogin"),
  },
  {
    title: "會員問題",
    name: "2",
    component: resolveComponent("MatchPokemonBank"),
  },
  {
    title: "媒合問題",
    name: "3",
    component: resolveComponent("MatchPokemonBank"),
  },
  {
    title: "媒合商務系統介紹",
    name: "4",
    component: resolveComponent("MatchPokemonBank"),
  }
]
</script>