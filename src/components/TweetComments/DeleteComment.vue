<template>
  <div>
    <button @click="delete_comment()">Delete Comment</button>
  </div>
</template>

<script>
export default {
  name: "delete-comment",
  props: {
    commentId: Number,
  },
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  methods: {
    delete_comment() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          method: "DELETE",
          data: {
            loginToken: this.user.loginToken,
            commentId: this.commentId,
          },
        })
        .then((response) => {
          response;
          this.$emit("update_comments");
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong deleting the comment. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
</style>