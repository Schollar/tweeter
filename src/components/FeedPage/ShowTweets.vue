<template>
  <div>
    <section class="tweet_section">
      <section v-for="tweet in tweets" :key="tweet.tweetId" class="tweet_card">
        <router-link :to="`/${tweet.username}`">
          <p>{{ tweet.username }}</p>
        </router-link>
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
    other_users() {
      return this.$store.state["other_users"];
    },
  },
  mounted: function () {
    this.show_tweets();
    this.fetch_users_info();
  },
  methods: {
    fetch_users_info() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/users",
          method: "GET",
        })
        .then((response) => {
          this.$store.commit("update_users", response.data);
        })
        .catch((error) => {
          error;
        });
    },
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