<template>
  <div id="app">
    <router-view />
    <toast-notification></toast-notification>
  </div>
</template>

<script>
import ToastNotification from "./components/GlobalComponents/ToastNotification.vue";
export default {
  components: { ToastNotification },
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