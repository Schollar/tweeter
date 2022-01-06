<template>
  <section class="user_signup_card">
    <form action="javascript:void(0)">
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
      <section class="input_section">
        <label for="email">Email</label>
        <input name="email" ref="email" placeholder="Email" />
      </section>
      <section class="input_section">
        <label for="bio">Biography</label>
        <input name="bio" ref="bio" placeholder="A little Biography" />
      </section>
      <section class="input_section">
        <label for="birthday">Birthday</label>
        <input name="birthday" ref="birthday" placeholder="1991-01-25" />
      </section>
      <section class="input_section">
        <label for="img_url">Profile Image</label>
        <input
          name="img_url"
          ref="img_url"
          placeholder="https://imageurl.com"
        />
      </section>
      <section class="input_section">
        <label for="banner_url">Banner Image</label>
        <input
          name="banner_url"
          ref="banner_url"
          placeholder="https://imageurl.com"
        />
      </section>
      <input
        class="form_button"
        @click="register_new_user"
        type="submit"
        value="Register"
      />
    </form>
  </section>
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
    // Getting the values from our form and passing them in to our api call
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
          // We set a user cookie
          // Update the user in the store
          // Router push to change to the feed page
          this.$cookies.set("user", response.data);
          this.$store.commit("update_user", response.data);
          this.$router.push({ path: "/feed-page" });
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

<style lang="scss">
.user_signup_card {
  border: 1px solid black;
  background-color: black;
  border-radius: 10px;
  color: white;
  display: grid;
  grid-template-rows: 1fr 20px;
  place-items: center;

  > form {
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
  .form_button {
    margin-top: 20px;
    border-radius: 20px;
    border: 1px solid black;
    height: 25px;
    background-color: #1d9bf0;
    color: white;
    font-family: sans-serif;
    font-weight: 775;
  }
}
</style>