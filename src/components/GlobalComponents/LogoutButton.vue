!<template>
  <div>
    <!-- Upon click we run the logout_user function -->
    <button class="logout_button" @click="logout_user">Logout</button>
  </div>
</template>

<script>
export default {
  name: "logout-button",
  methods: {
    // A delete axios request with the user logintoken sent as data, upon success we delete the user cookie and push the homepage path to the router to send the user to the login/signup page
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
.logout_button {
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid black;
  height: 25px;
  background-color: #1d9bf0;
  color: white;
  font-family: sans-serif;
  font-weight: 775;
}
</style>