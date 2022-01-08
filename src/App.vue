<template>
  <div
    v-if="notClickable"
    v-bind:class="{ notclickable: notClickable }"
    id="app"
  >
    <router-view />
    <toast-notification></toast-notification>
  </div>
  <div v-else id="app">
    <router-view />
    <toast-notification></toast-notification>
  </div>
</template>

<script>
import ToastNotification from "./components/GlobalComponents/ToastNotification.vue";
export default {
  components: { ToastNotification },
  methods: {
    switch_click() {
      this.notClickable = !this.notClickable;
    },
  },
  data() {
    return {
      notClickable: false,
    };
  },
  mounted() {
    this.$root.$on("not_clickable", this.switch_click);
    this.$root.$on("clickable", this.switch_click);
  },
};
</script>
<style lang="scss">
#app {
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
}
.notclickable {
  pointer-events: none;
}
</style>