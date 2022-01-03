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
          // Update the user in the store
          // Router push to change to the landingpage
          response;
          this.$cookies.remove("user");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.error_message = error;
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