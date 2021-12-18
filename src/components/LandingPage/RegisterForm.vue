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
      <div>
        <label for="email">Email</label>
        <input name="email" ref="email" placeholder="Email" />
      </div>
      <div>
        <label for="bio">Bio</label>
        <input name="bio" ref="bio" placeholder="bio" />
      </div>
      <div>
        <label for="birthday">Birthday</label>
        <input name="birthday" ref="birthday" placeholder="birthday" />
      </div>
      <div>
        <label for="img_url">Profile Image URL</label>
        <input
          name="img_url"
          ref="img_url"
          placeholder="Url for Profile Image"
        />
      </div>
      <div>
        <label for="banner_url">Banner Image URL</label>
        <input
          name="banner_url"
          ref="banner_url"
          placeholder="Url for banner Image"
        />
      </div>
      <input @click="register_new_user" type="submit" value="Register" />
    </form>
    <h1>{{ error_message }}</h1>
  </div>
</template>

<script>
export default {
  name: "register-form",
  data() {
    return {
      error_message: "",
    };
  },
  methods: {
    register_new_user() {
      var username = this.$refs["username"].value;
      var password = this.$refs["password"].value;
      var email = this.$refs["email"].value;
      var bio = this.$refs["bio"].value;
      var birthday = this.$refs["birthday"].value;
      var img_url = this.$refs["img_url"].value;
      var banner_url = this.$refs["banner_url"].value;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/users",
          method: "POST",
          data: {
            username: username,
            password: password,
            email: email,
            bio: bio,
            birthdate: birthday,
            img_url: img_url,
            banner_url: banner_url,
          },
        })
        .then((response) => {
          this.$cookies.set("user", response.data);
          this.$store.commit("update_user", response.data);
          this.$router.push({ path: "/feed-page" });
        })
        .catch((error) => {
          this.error_message = error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>