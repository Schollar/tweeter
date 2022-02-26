<template>
  <div class="follow_user_section">
    <p class="unfollow_button" @click="unfollow_user()">UnFollow</p>
  </div>
</template>

<script>
export default {
  name: "unfollow-user",

  data() {
    return {
      user: this.$cookies.get("user"),
      api_message: "",
    };
  },
  props: {
    userId: Number,
    has_followed: Boolean,
  },
  methods: {
    // This function makes a delete axios request to unfollow a user. We send the login token and followId(userId of the person we are unfollowing)
    // On success we emit 2 global events, one to update the user follow list, and the other sends a notifaction to the user that says they are now unfollowing
    unfollow_user() {
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/follows`,
          method: "DELETE",
          data: {
            loginToken: this.user.loginToken,
            followId: this.userId,
          },
        })
        .then((response) => {
          response;
          this.$root.$emit("update_user_follow", this.userId);
          this.$root.$emit(
            "api_message",
            "You are no longer following this user!"
          );
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong with unfollowing. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
.follow_user_section {
  display: grid;
  place-items: center;
}
.unfollow_button {
  font-size: 10px;
  font-weight: 600;
  width: 50px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 2px;
  padding-left: 5px;
  color: white;
  background-color: #1d9bf0;
}
.unfollow_button:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>