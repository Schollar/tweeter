<template>
  <div v-if="user.userId === selected_user.userId">
    <p @click="move_to_user_profile()">Your Profile</p>
  </div>
  <div v-else-if="is_followed === true">
    <button @click="unfollow_user()">UnFollow user</button>
    <p>{{ api_message }}</p>
  </div>
  <div v-else>
    <button @click="follow_user()">Follow user</button>
    <p>{{ api_message }}</p>
  </div>
</template>

<script>
export default {
  name: "follow-user",
  computed: {
    selected_user() {
      return this.$store.state["selected_user"];
    },
  },
  mounted() {
    this.get_loggedin_user_follows();
    this.check_user_followed();
  },
  data() {
    return {
      api_message: "",
      user: this.$cookies.get("user"),
      followed_users: [],
      is_followed: "",
    };
  },
  methods: {
    unfollow_user() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          method: "DELETE",
          data: {
            loginToken: this.user.loginToken,
            followId: this.selected_user.userId,
          },
        })
        .then((response) => {
          response;
          this.api_message = `You are no longer following ${this.selected_user.username}`;
          this.is_followed = false;
        })
        .catch((error) => {
          error;
          this.api_message = `Sorry something went wrong, please try again later`;
        });
    },
    check_user_followed() {
      this.followed_users.forEach((item) => console.log(item));
    },
    get_loggedin_user_follows() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          method: "GET",
          params: {
            userId: this.user.userId,
          },
        })
        .then((response) => {
          this.followed_users = response.data;
        })
        .catch((error) => {
          error;
          this.api_message = `Sorry something went wrong, please try again later`;
        });
    },
    move_to_user_profile() {
      this.$router.push({ path: "/user-profile" });
    },
    follow_user() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          method: "POST",
          data: {
            loginToken: this.user.loginToken,
            followId: this.selected_user.userId,
          },
        })
        .then((response) => {
          response;
          this.api_message = `You are now following ${this.selected_user.username}`;
          this.is_followed = true;
        })
        .catch((error) => {
          error;
          this.api_message = `Sorry something went wrong, please try again later`;
        });
    },
  },
};
</script>

<style scoped>
</style>