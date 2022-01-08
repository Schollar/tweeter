!<template>
  <div>
    <button @click="logout_user">Logout</button>
  </div>
</template>

<script>
export default {
  name: "logout-button",
  methods: {
    logout_user() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/login",
          method: "DELETE",
          data: {
            loginToken: this.user.loginToken,
          },
        })
        .then((response) => {
          response;
          this.$cookies.remove("user");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong with logging out.Please try again later"
          );
        });
    },
  },
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
};
</script>

<style scoped>
</style>