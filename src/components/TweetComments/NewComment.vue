<template>
  <div>
    <p
      class="show_comment_button"
      @click="show_new_comment = !show_new_comment"
    >
      Comment
    </p>
    <section v-if="show_new_comment" class="new_comment_section">
      <form action="javascript:void(0)" class="new_comment_form">
        <label for="new_tweet_comment">Comment: </label>
        <section class="input_section">
          <textarea
            maxlength="200"
            name="new_tweet_comment"
            ref="new_tweet_comment"
            placeholder="New Comment"
            type="textarea"
          />
          <input
            class="new_comment_button"
            @click="new_tweet_comment"
            type="submit"
            value="Post"
          />
        </section>
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
          this.show_new_comment = false;
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong making the comment. Please try again later"
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
.new_comment_form {
  display: grid;
  gap: 10px;
  font-weight: 600;
  width: 280px;
}
.new_comment_section {
  position: relative;
  width: 200px;
  left: -110px;
  margin-bottom: 10px;
}
.new_comment_button {
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid black;
  height: 25px;
  background-color: #1d9bf0;
  color: white;
  font-family: sans-serif;
  font-weight: 775;
}
.input_section {
  display: grid;
  gap: 5px;
  grid-auto-flow: column;
}
</style>