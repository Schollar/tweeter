<template>
  <div>
    <page-header></page-header>
    <register-form></register-form>
    <login-form></login-form>
  </div>
</template>

<script>
import PageHeader from "../components/GlobalComponents/PageHeader.vue";
import LoginForm from "../components/LandingPage/LoginForm.vue";
import RegisterForm from "../components/LandingPage/RegisterForm.vue";
export default {
  name: "landing-page",
  components: {
    RegisterForm,
    LoginForm,
    PageHeader,
  },
};
</script>

<style lang="scss" scoped>
</style>