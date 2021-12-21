<template>
  <div>
    <h1>Tweeter</h1>
    <nav v-if="!user.loginToken"></nav>
    <nav v-else>
      <p @click="goto_user_profile">Profile</p>
      <p @click="goto_user_profile">Profile</p>
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
  methods: {
    goto_user_profile() {
      this.$router.push({ path: "/user-profile" });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 3fr 150px;
  margin-bottom: 50px;
}

nav {
  display: grid;
  grid-auto-flow: column;
  font-size: 12px;
  place-items: center;
  justify-items: start;
}
</style>