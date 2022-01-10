<template>
  <div class="comment_like_container">
    <p ref="like_or_likes"></p>
    <!-- These components listen for an event and runs a function if event is heard -->
    <!-- If hasliked is false we show the like component, else we show the delete like component -->
    <like-comment
      @update_has_liked="update_has_liked"
      v-if="!has_liked"
      :commentId="commentId"
    ></like-comment>
    <delete-like
      @update_has_liked="update_has_liked"
      v-else
      :commentId="commentId"
    ></delete-like>
  </div>
</template>

<script>
import DeleteLike from "./DeleteLike.vue";
import LikeComment from "./LikeComment.vue";
export default {
  components: { LikeComment, DeleteLike },
  created() {
    this.get_comment_likes();
  },
  data() {
    return {
      user: this.$cookies.get("user"),
      comment_likes: [],
      has_liked: false,
    };
  },
  methods: {
    // Function that takes in a boolean and sets has liked to it. It then calls another function to be ran
    update_has_liked(boo) {
      this.has_liked = boo;
      this.get_comment_likes();
    },
    //  Here we check the length of an array to inject either Like or Likes on the page.
    inject_like_count() {
      if (this.comment_likes.length === 1) {
        this.$refs[
          "like_or_likes"
        ].innerText = `${this.comment_likes.length} Like`;
      } else {
        this.$refs[
          "like_or_likes"
        ].innerText = `${this.comment_likes.length} Likes`;
      }
    },
    // Loop through an array and check if the logged in user matches a user in the array, if it does we set has liked variable to true
    check_user_liked(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].userId === this.user.userId) {
          this.has_liked = true;
        }
      }
    },
    // Axios get request with a commentId param sent to get a peticular comments likes.
    // On success we set the comment likes array to the response.data and then call our check user liked function and pass the newly populated array to it to check if we like the user.
    // Then call another function to inject the like count onto the page
    get_comment_likes() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comment-likes",
          params: {
            commentId: this.commentId,
          },
        })
        .then((response) => {
          this.comment_likes = response.data;
          this.check_user_liked(this.comment_likes);
          this.inject_like_count();
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong with getting comment likes. Please try again later"
          );
        });
    },
  },
  name: "comment-likes",
  props: {
    commentId: Number,
  },
};
</script>

<style lang="scss" scoped>
.comment_like_container {
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  grid-template-columns: 70px;
  border-top: 1px solid black;
  width: 100%;
  > p {
    margin-left: 10px;
  }
}
</style>