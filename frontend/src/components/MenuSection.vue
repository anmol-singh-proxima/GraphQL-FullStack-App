<template>
  <div id="menu-section">
    <div v-for="(item, index) in menuItems" :key="item">
      <p class="menu-section-item" @click="setMenuIndex(index)">{{ item }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'MenuSection',
    props: {
        menuItems: Array,
        currentMenuIndex: Number,
        setMenuIndex: Function,
    },
}
</script>

<style scoped>
#menu-section {
    display: block;
}
.menu-section-item {
    padding: 10px;
    margin: 0;
    color: #fff;
    background-color:darkgoldenrod;
    border-bottom: 1px solid #fff;
}
.menu-section-item:hover {
    color: #333;
    background-color: #eee;
}
</style>