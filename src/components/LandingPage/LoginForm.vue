<template>
  <div>
    <form class="login_form" action="javascript:void(0)">
      <section class="input_section">
        <label for="username">Username</label>
        <input name="username" ref="username" placeholder="Username" />
      </section>
      <section class="input_section">
        <label for="password">Password</label>
        <input
          name="password"
          ref="password"
          placeholder="Password"
          type="password"
        />
      </section>
      <!-- When user clicks button to sumbit form we call our login user function -->
      <input
        class="login_form_button"
        @click="login_user"
        type="submit"
        value="Login"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "login-form",
  methods: {
    login_user() {
      // Get the value from the username and password filled out and use that data to pass to our api call

      var username = this.$refs["username"].value;
      var password = this.$refs["password"].value;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/login",
          method: "POST",
          data: {
            username: username,
            password: password,
          },
        })
        // On success we set a cookie user cookie
        // Call update user mutation
        // Router push to change to the feed page
        .then((response) => {
          this.$cookies.set("user", response.data);
          this.$store.commit("update_user", response.data);
          this.$router.push({ path: "/feed-page" });
          localStorage.setItem("user", response.data);
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong. Please try again later"
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_form {
  display: grid;
}

.input_section {
  display: grid;
  margin-top: 5px;

  > input {
    border: 1px solid black;
    border-radius: 3px;
    text-align: center;
    height: 25px;
  }
}
.login_form_button {
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