<template>
  <div>
    <button @click="show_form = !show_form">Edit Comment</button>
    <section v-show="show_form" class="update_comment_form">
      <form action="javascript:void(0)">
        <div>
          <label for="update_comment">Comment: </label>
          <textarea
            maxlength="200"
            name="update_comment"
            ref="update_comment"
            placeholder="Update Comment"
            type="textarea"
          />
        </div>
        <input @click="update_comment" type="submit" value="Edit Comment" />
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "update-comment",
  data() {
    return {
      user: this.$cookies.get("user"),
      show_form: false,
    };
  },
  props: {
    commentId: Number,
  },
  methods: {
    update_comment() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          method: "PATCH",
          data: {
            commentId: this.commentId,
            loginToken: this.user.loginToken,
            content: this.$refs["update_comment"].value,
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
            "Sorry something went wrong. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
</style>