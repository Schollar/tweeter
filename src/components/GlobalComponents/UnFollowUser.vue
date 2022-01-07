<template>
  <div>
    <button @click="unfollow_user()">UnFollow</button>
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
    unfollow_user() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/follows",
          method: "DELETE",
          data: {
            loginToken: this.user.loginToken,
            followId: this.userId,
          },
        })
        .then((response) => {
          response;
          this.$root.$emit("update_user_follow", this.userId);
          this.$root.$emit("api_message", "You are now following this user!");
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
</style>