<template>
  <div>
    <!-- Button gets clicked a function is called -->
    <button @click="like_comment">Like</button>
  </div>
</template>

<script>
export default {
  name: "like-comment",
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  methods: {
    // Axios post request that we send a commentId and logintoken to like a certain comment.
    // On success we flip the has_like to true and emit an event to the parent and send the new has_liked value to the parent.
    like_comment() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comment-likes",
          method: "POST",
          data: {
            commentId: this.commentId,
            loginToken: this.user.loginToken,
          },
        })
        .then((response) => {
          response;
          var has_liked = true;
          this.$emit("update_has_liked", has_liked);
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong with liking this comment. Please try again later"
          );
        });
    },
  },
  props: {
    commentId: Number,
    has_liked: Boolean,
  },
};
</script>

<style scoped>
</style>