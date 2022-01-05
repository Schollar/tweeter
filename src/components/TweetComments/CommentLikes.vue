<template>
  <div>
    <p ref="like_or_likes"></p>
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
    update_has_liked(boo) {
      this.has_liked = boo;
      this.get_comment_likes();
    },
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
    check_user_liked(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].userId === this.user.userId) {
          this.has_liked = true;
        }
      }
    },
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
          this.error_message = error;
        });
    },
  },
  name: "comment-likes",
  props: {
    commentId: Number,
  },
};
</script>

<style scoped>
</style>