<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    var user = this.$cookies.get("user");
    if (!user) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>
<style lang="scss">
#app {
  font-family: sans-serif;
}
</style>