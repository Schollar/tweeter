<template>
  <div>
    <section class="tweet_section">
      <section v-for="tweet in tweets" :key="tweet.tweetId" class="tweet_card">
        <p>{{ tweet.username }}</p>
        <p>{{ tweet.content }}</p>
        <p>{{ tweet.createdAt }}</p>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "show-tweets",
  computed: {
    tweets() {
      return this.$store.state["tweets"];
    },
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
          this.$store.commit("get_tweets", response.data);
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style scoped>
.tweet_section {
  display: grid;
  gap: 25px;
}
.tweet_card {
  display: grid;
  border: 1px solid black;
  border-radius: 10px;
}
</style>