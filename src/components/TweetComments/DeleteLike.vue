<template>
  <div>
    <button @click="delete_like_comment()">Unlike</button>
  </div>
</template>

<script>
export default {
  name: "delete-like",
  props: {
    commentId: Number,
  },
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  methods: {
    delete_like_comment() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comment-likes",
          method: "DELETE",
          data: {
            commentId: this.commentId,
            loginToken: this.user.loginToken,
          },
        })
        .then((response) => {
          response;
          var has_liked = false;
          this.$emit("update_has_liked", has_liked);
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong with deleting the comment like. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
</style>