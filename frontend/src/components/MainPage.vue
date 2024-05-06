<!-- eslint-disable prettier/prettier -->
<template>
  <div v-if="isLoggedIn" id="main-page">
    <div class="menu-section">
      <MenuSection 
      :menuItems="menuItems"
      :currentMenuIndex="currentMenuIndex"
      :setMenuIndex="setMenuIndex"/>
    </div>
    <div class="main-section">
      <MainSection 
      :menuItems="menuItems"
      :currentMenuIndex="currentMenuIndex"
      :setMenuIndex="setMenuIndex"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MenuSection from './MenuSection.vue';
import MainSection from './MainSection.vue';
export default {
  name: 'MainPage',
  components: {
    MenuSection,
    MainSection,
  },
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      menuItems: [
        'Projects',
        'Tasks',
      ],
      currentMenuIndex: 0,
    }
  },
  methods: {
    setMenuIndex(index) {
      this.currentMenuIndex = index
    }
  },
  provide() {
    return {
      data: this.menuItems
    }
  }
}
</script>

<style>
#main-page {
  padding: 0;
  margin: 0;
  display: grid;
  /* grid-template-columns: 25% 25% 25% 25%; */
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50px auto 50px;
  height: 100%;
}
.menu-section {
  grid-column: 1/2;
  grid-row: 1/2;
}
.main-section {
  grid-column: 2/6;
  grid-row: 1/2;
}
</style>