<!-- eslint-disable prettier/prettier -->
<template>
  <div id="footer">
    <section class="upper-footer">
      <div class="list-section">
        <h3 class="list-heading">Projects</h3>
        <ul class="list-menu">
          <li class="menu-item">All Projects</li>
          <li class="menu-item">Active Projects</li>
          <li class="menu-item">Completed Projects</li>
          <li class="menu-item">Create New Project</li>
        </ul>
      </div>
      <div class="list-section">
        <h3 class="list-heading">Tasks</h3>
        <ul class="list-menu">
          <li class="menu-item">All Tasks</li>
          <li class="menu-item">Active Tasks</li>
          <li class="menu-item">Completed Tasks</li>
          <li class="menu-item">Create New Task</li>
        </ul>
      </div>
    </section>
    <section class="lower-footer">
      <div class="copyright">Copyright &copy; 2024 | All Rights Reserved</div>
      <div class="designby">Common Transaction System | Designed By <span>Anmol Singh</span></div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "FooterComponent",
};
</script>

<!-- CSS Styling for Footer Component -->
<style scoped>
#footer {
  display: block;
}
#footer .upper-footer {
  display: flex;
  flex-direction: row;
  background-color: #3a3a3a;
  padding: 20px 100px;
  padding-top: 40px;
}
#footer .upper-footer .list-section {
  margin-right: 70px;
  width: auto;
}
#footer .upper-footer .list-section .list-heading {
  font-size: 1.3rem;
  line-height: 1.7;
  color: rgb(17, 206, 17);
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}

#footer .upper-footer .list-section .list-menu {
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
#footer .upper-footer .list-section .list-menu .menu-item {
  display: block;
  margin: 0;
  padding: 6px 16px;
  padding-left: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgb(134, 219, 134);
  cursor: pointer;
}
#footer .upper-footer .list-section .list-menu .menu-item:hover {
  text-decoration: underline;
}

#footer .lower-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #222;
  padding: 20px 100px;
}
#footer .lower-footer .copyright {
  font-size: 0.9rem;
  line-height: 1.2;
  color: #eee;
}
#footer .lower-footer .designby {
  font-size: 0.9rem;
  line-height: 1.2;
  color: #eee;
}
#footer .lower-footer .designby span {
  font-size: 0.9rem;
  color: green;
}
</style>