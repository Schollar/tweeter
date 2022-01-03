<template>
  <div>
    <h1>Tweeter</h1>
    <!-- Check to see if the user does not have a valid token -->
    <nav v-if="!user.loginToken"></nav>
    <!-- If user does have a login token, we show our navigation menu -->
    <nav v-else>
      <p @click="goto_user_profile">Profile</p>
      <p @click="goto_user_profile">Tweet Feed</p>
    </nav>
  </div>
</template>

<script>
export default {
  name: "page-header",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.get_user();
  },
  methods: {
    // Using a router to change page to user profile
    goto_user_profile() {
      this.$router.push({ path: "/user-profile" });
    },
    get_user() {
      this.$store.commit("get_user_info", this.$cookies.get("user"));
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  color: white;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr 25px;
  place-items: center;
}

nav {
  display: grid;
  grid-auto-flow: column;
  font-size: 12px;
  place-items: center;
  justify-items: start;
}
</style>