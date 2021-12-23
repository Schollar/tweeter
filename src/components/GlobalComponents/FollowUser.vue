<template>
  <div v-if="is_followed">
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
  mounted() {
    this.get_loggedin_user_follows();
  },
  data() {
    return {
      api_message: "",
      user: this.$cookies.get("user"),
      followed_users: [],
      is_followed: false,
    };
  },
  props: {
    selected_user: Object,
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
      for (var i = 0; i < this.followed_users.length; i++) {
        if (this.selected_user.userId === this.followed_users[i].userId) {
          this.is_followed = true;
        } else {
          this.is_followed = false;
        }
      }
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
          this.check_user_followed();
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