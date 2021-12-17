<template>
  <div>
    <section class="tweet_section">
      <section v-for="tweet in tweets" :key="tweet.tweetId" class="tweet_card">
        <p>{{ tweet.username }}</p>
        <p>{{ tweet.content }}</p>
        <p>{{ tweet.createdAt }}</p>
      </section>
    </section>
    <form action="javascript:void(0)">
      <div>
        <label for="new_tweet">Tweet</label>
        <input
          name="new_tweet"
          ref="new_tweet"
          placeholder="New Tweet"
          type="textarea"
        />
      </div>
      <input @click="new_tweet" type="submit" value="Post Tweet" />
    </form>
  </div>
</template>

<script>
export default {
  name: "new-tweet",
  data() {
    return {
      tweets: [],
    };
  },
  mounted: function () {
    this.show_tweets();
  },
  methods: {
    show_tweets() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "GET",
        })
        .then((response) => {
          this.tweets = response.data;
        })
        .catch((error) => {
          error;
        });
    },
    new_tweet() {
      var login_token = this.$cookies.get("user");
      var content = this.$refs["new_tweet"].value;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweets",
          method: "POST",
          data: {
            loginToken: login_token.loginToken,
            content: content,
          },
        })
        .then((response) => {
          this.tweets.push(response.data);
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>