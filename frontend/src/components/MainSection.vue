<template>
  <div id="main-section">
    <Projects v-if="currentMenuIndex === 0" />
    <Tasks v-if="currentMenuIndex === 1" />
  </div>
</template>

<script>
/* eslint-disable */
import Projects from './Projects.vue'
import Tasks from './Tasks.vue'

export default {
    name: 'MainSection',  
    components: {
        Projects,
        Tasks,
    }, 
    props: {
        currentMenuIndex: Number,
    },
}
</script>

<style>
.main-section {
    display: block;
    height: 100%;
}
</style>