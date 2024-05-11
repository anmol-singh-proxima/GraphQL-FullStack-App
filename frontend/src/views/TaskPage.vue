<!-- eslint-disable prettier/prettier -->
<template>
  <div id="task-page" v-if="isLoggedIn">
    <HeaderComponent />
    <div class="page-content">
      <header class="header-section">
        <ul class="header-menu">
          <li class="menu-item" v-on:click="showAllTasks">All Tasks</li>
          <li class="menu-item">Active Tasks</li>
          <li class="menu-item">Completed Tasks</li>
          <li class="menu-item menu-btn" v-on:click="showAddTask">Create New Task</li>
        </ul>
      </header>
      <section class="content-section">
        <GetTasks v-if="isShowAllTasks" />
        <AddTask v-if="isShowAddTask" />
      </section>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
import HeaderComponent from '@/components/Header.vue';
import FooterComponent from '@/components/Footer.vue';
import GetTasks from '@/components/GetTasks.vue';
import AddTask from '@/components/AddTask.vue';

export default {
  name: 'TaskPage',
  components: {
    HeaderComponent,
    FooterComponent,
    GetTasks,
    AddTask,
  },
  data() {
    return {
      isLoggedIn: false,
      isShowAllTasks: false,
      isShowAddTask: false,
    }
  },
  created() {
    console.log('[TaskPage.vue] created()');
    this.checkIfLoggedIn();
    return;
  },
  mounted() {
    console.log('[TaskPage.vue] mounted()');
    return;
  },
  methods: {
    checkIfLoggedIn() {
      const token = sessionStorage.getItem('token');
      const user = sessionStorage.getItem('user');
      if(token && user) {
        console.log('[TaskPage.vue] User is logged-In');
        this.isLoggedIn = true;
        this.isShowAllTasks = true;
      } else {
        console.log('[TaskPage.vue] User not logged-In');
        this.$router.push({ path: '/login' });
        return;
      }
    },
    showAllTasks() {
      this.isShowAddTask = false;
      this.isShowAllTasks = true; // Show All Tasks
    },
    showAddTask() {
      this.isShowAllTasks = false;
      this.isShowAddTask = true; // Show Add Task
    },
  },
}
</script>

<style scoped>
#task-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#task-page .page-content {
  flex: 1;
  overflow-y: auto;
}
.header-section {
  width: 100%;
  height: 100%;
  padding: 6px 100px;
  background-color: rgba(230, 240, 255, 0.6);
  border-bottom: 1px solid rgba(50, 90, 125, 0.105);
}
.header-menu {
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.header-menu .menu-item {
  display: inline-block;
  margin: 0;
  padding: 6px 16px 6px 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: green;
  cursor: pointer;
}
.header-menu .menu-item:hover {
  color: darkgreen;
  text-decoration: underline;
}
.header-menu .menu-btn {
  border: 1px solid rgba(0, 128, 0, 0.5);
  color: green;
  background-color: #fff;
  background-color: rgba(230, 255, 230, 0.5);
  padding: 6px 16px;
}
.header-menu .menu-btn:hover {
  text-decoration: none;
  border: 1px solid rgba(0, 128, 0);
}
.content-section {
  padding: 20px 100px;
}
</style>