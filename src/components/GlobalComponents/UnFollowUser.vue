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
          this.new_has_followed = this.has_followed;
          this.new_has_followed = false;
          this.$emit("update_has_followed", this.new_has_followed);
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style scoped>
</style>