<template>
  <div>
    <form action="javascript:void(0)">
      <div>
        <label for="username">Username</label>
        <input name="username" ref="username" placeholder="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          name="password"
          ref="password"
          placeholder="password"
          type="password"
        />
      </div>
      <input @click="login_user" type="submit" value="Login" />
    </form>
    <h1>{{ error_message }}</h1>
  </div>
</template>

<script>
export default {
  name: "login-form",
  data() {
    return {
      error_message: "",
    };
  },
  methods: {
    login_user() {
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
        .then((response) => {
          this.$cookies.set("user", response.data);
          this.$router.push({ path: "/feed-page" });
        })
        .catch((error) => {
          error;
          this.error_message =
            "Invalid Username or Password. Please try again!";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>