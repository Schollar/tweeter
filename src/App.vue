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
};
</script>
<style lang="scss">
#app {
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: grey;
}
</style>