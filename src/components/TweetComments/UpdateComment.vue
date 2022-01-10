<template>
  <div>
    <!-- Button that toggles a variable to true or false when its clicked -->
    <button @click="show_form = !show_form">Edit Comment</button>
    <!-- If showform is true this section is shown on the page -->
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
        <!-- When clicked a function is called -->
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
    // Axios patch request that updates a certain comment. We send the commentId, a logintoken and the new comments content.
    // On success we emit an event to update a tweets comments so the newly edited comment is shown on the page
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
            "Sorry something went wrong with updating the comment. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
</style>