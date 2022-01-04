<template>
  <div>
    <button @click="unfollow_user()">UnFollow</button>
    {{ api_message }}
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
    selected_user: Object,
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
            followId: this.selected_user.userId,
          },
        })
        .then((response) => {
          response;
          this.api_message = `You are no longer following ${this.selected_user.username}`;
          this.new_has_followed = this.has_followed;
          this.new_has_followed = false;
          this.$emit("update_has_followed", this.new_has_followed);
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