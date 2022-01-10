<template>
  <div class="delete_user_container">
    <p>Delete User</p>
    <form class="delete_user_form" action="javascript:void(0)">
      <section class="input_section">
        <label for="password">Password</label>
        <input
          name="password"
          ref="password"
          placeholder="password"
          type="password"
        />
        <!-- When user clicks button to sumbit form we call our delete user function -->
        <input @click="delete_user" type="submit" value="Delete" />
      </section>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state["user"];
    },
  },
  methods: {
    // Axios delete request to delete a user from the app.
    // getting the login token and input value from the form above and sending it to the api.
    delete_user() {
      var login_token = this.user.loginToken;
      var password_input = this.$refs["password"].value;

      this.$axios
        .request({
          url: "https://tweeterest.ga/api/users",
          method: "DELETE",
          data: {
            password: password_input,
            loginToken: login_token,
          },
        })
        .then((response) => {
          // We delete our user cookie
          // Router push to change to the landingpage
          response;
          this.$cookies.remove("user");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong with deleting the user. Please try again later"
          );
        });
    },
  },
  name: "delete-user",
};
</script>

<style scoped>
.delete_user_container {
  display: grid;
  place-items: center;
}

.delete_user_form {
  display: grid;
  place-items: center;
}

.input_section {
  display: grid;
}
</style>