<template>
  <div class="landing_page_body">
    <!-- Using a variable to show what component is shown on the page. -->
    <div :is="current_component"></div>
    <div v-show="!current_component"></div>
    <section class="backup_section" v-if="current_component === 'RegisterForm'">
      <p>Already a user?</p>
      <button @click="update_component(component_views[1])">Login</button>
    </section>
    <section class="backup_section" v-else>
      <p>Not a User Yet?</p>
      <button @click="update_component(component_views[0])">Signup</button>
    </section>
  </div>
</template>

<script>
import LoginForm from "../components/LandingPage/LoginForm.vue";
import RegisterForm from "../components/LandingPage/RegisterForm.vue";
export default {
  name: "landing-page",
  // Calling a function when component is mounted
  mounted() {
    this.auth_user();
  },
  methods: {
    // Function that checks if user variable does not equal null, if it does not we send the user to the feed page
    auth_user() {
      if (this.user !== null) {
        this.$router.push({ path: "/feed-page" });
      }
    },
    // Function that updates a variable to show what component is shown on the page
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
  },
};
</script>

<style lang="scss" scoped>
.landing_page_body {
  background-color: black;
  height: 100vh;
  color: white;
  display: grid;
  place-items: center;
}

.backup_section {
  display: grid;
  border: #1d9bf0 1px solid;
  border-radius: 10px;
  width: 75%;
  place-items: center;

  > p {
    font-weight: 700;
  }

  > button {
    border-radius: 20px;
    border: 1px solid black;
    height: 25px;
    width: 75%;
    background-color: #1d9bf0;
    color: white;
    font-family: sans-serif;
    font-weight: 775;
    margin-bottom: 15px;
  }
}
</style>