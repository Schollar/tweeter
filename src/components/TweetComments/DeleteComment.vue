<template>
  <div>
    <!-- Button gets clicked and calls a delete comment function -->
    <p class="delete_comment_button" @click="delete_comment">Delete Comment</p>
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
    // Axios delete request with a logintoken and commentId sent to it. On success we emit an event to the parent to update the comment array which then removes the comment from the page
    delete_comment() {
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/comments`,
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

<style lang="scss">
.delete_comment_button {
  font-size: 9px;
}

.delete_comment_button:hover {
  text-decoration: underline;
}
</style>