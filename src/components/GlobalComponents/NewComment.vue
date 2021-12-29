<template>
  <div>
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
      <!-- When clicked we call the new tweet function -->
      <input @click="new_tweet_comment" type="submit" value="Post Comment" />
    </form>
  </div>
</template>

<script>
export default {
  name: "new-comment",
  computed: {
    tweet_comments() {
      return this.$store.state["tweet_comments"];
    },
  },
  props: {
    tweetId: Number,
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
          this.$store.commit("update_tweet_comments", response.data);
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