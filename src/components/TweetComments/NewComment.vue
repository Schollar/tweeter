<template>
  <div>
    <p
      class="show_comment_button"
      @click="show_new_comment = !show_new_comment"
    >
      Comment
    </p>
    <section v-if="show_new_comment" class="new_comment_section">
      <form action="javascript:void(0)">
        <div>
          <label for="new_tweet_comment">Comment: </label>
          <textarea
            maxlength="200"
            name="new_tweet_comment"
            ref="new_tweet_comment"
            placeholder="New Comment"
            type="textarea"
          />
        </div>
        <!-- When clicked we call the new comment function -->
        <input @click="new_tweet_comment" type="submit" value="Post Comment" />
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "new-comment",
  data() {
    return {
      show_new_comment: false,
    };
  },
  props: {
    tweetId: Number,
  },
  computed: {
    tweet_comments() {
      return this.$store.state["tweet_comments"];
    },
  },
  methods: {
    new_tweet_comment() {
      var login_token = this.$cookies.get("user");
      var content = this.$refs["new_tweet_comment"].value;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          method: "POST",
          data: {
            loginToken: login_token.loginToken,
            content: content,
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          this.api_message = "Comment has been posted!";
          this.$store.commit("update_tweet_comments", response.data);
          this.$root.$emit("update_comments");
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong deleting the tweet. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
.show_comment_button {
  font-size: 11px;
  font-weight: 700;
  padding-top: 4px;
}
.show_comment_button:hover {
  text-decoration: underline;
}
</style>