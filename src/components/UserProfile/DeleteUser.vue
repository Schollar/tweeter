<template>
  <div>
    <form action="javascript:void(0)">
      <div>
        <label for="password">Password</label>
        <input
          name="password"
          ref="password"
          placeholder="password"
          type="password"
        />
      </div>
      <!-- When user clicks button to sumbit form we call our delete user function -->
      <input @click="delete_user" type="submit" value="Login" />
    </form>
    <button>Delete User</button>
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
</style>