<!-- eslint-disable prettier/prettier -->
<template>
  <div id="footer">
    <div class="copyright">Copyright &copy; 2024 | All Rights Reserved</div>
    <div class="designby">Common Transaction System | Designed By <span>Anmol Singh</span></div>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: #222;
  margin-top: auto;
}
#footer .copyright {
  font-size: 0.9rem;
  line-height: 1.2;
  color: #eee;
}
#footer .designby {
  font-size: 0.9rem;
  line-height: 1.2;
  color: #eee;
}
#footer .designby span {
  font-size: 0.9rem;
  color: green;
}
</style>
