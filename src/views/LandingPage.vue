<template>
  <div>
    <page-header></page-header>
    <div :is="current_component"></div>
    <div v-show="!current_component"></div>
    <!-- <register-form></register-form> -->
    <p
      v-if="current_component === 'RegisterForm'"
      @click="update_component(component_views[1])"
    >
      Already a user?Click Here to Login
    </p>
    <p v-else @click="update_component(component_views[0])">
      Not a User Yet? Click here to signup!
    </p>
    <!-- <login-form></login-form> -->
  </div>
</template>

<script>
import PageHeader from "../components/GlobalComponents/PageHeader.vue";
import LoginForm from "../components/LandingPage/LoginForm.vue";
import RegisterForm from "../components/LandingPage/RegisterForm.vue";
export default {
  name: "landing-page",
  mounted() {
    this.auth_user();
  },
  methods: {
    auth_user() {
      if (this.user !== null) {
        this.$router.push({ path: "/feed-page" });
      }
    },
    update_component(component) {
      this.current_component = component;
    },
  },
  data() {
    return {
      user: this.$cookies.get("user"),
      current_component: "RegisterForm",
      component_views: ["RegisterForm", "LoginForm"],
    };
  },
  components: {
    RegisterForm,
    LoginForm,
    PageHeader,
  },
};
</script>

<style lang="scss" scoped>
</style>