<template>
  <div>
    <section class="tweet_section">
      <section v-for="tweet in tweets" :key="tweet.tweetId" class="tweet_card">
        <router-link :to="`/users/${tweet.username}`">
          <p @click="update_user_selected(tweet.username)">
            {{ tweet.username }}
          </p>
        </router-link>

        <p>{{ tweet.content }}</p>
        <p>{{ tweet.createdAt }}</p>
        <new-comment :tweetId="tweet.tweetId"></new-comment>
        <tweet-comments :tweetId="tweet.tweetId"></tweet-comments>
        <tweet-likes :tweetId="tweet.tweetId"></tweet-likes>
      </section>
    </section>
  </div>
</template>

<script>
import NewComment from "../TweetComments/NewComment.vue";
import TweetComments from "../TweetComments/TweetComments.vue";
import TweetLikes from "../UserProfile/TweetLikes.vue";
export default {
  components: { TweetLikes, NewComment, TweetComments },
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
    update_user_selected(username) {
      for (var i = 0; i < this.other_users.length; i++) {
        if (username === this.other_users[i].username) {
          this.$store.commit("update_selected_user", this.other_users[i]);
        }
      }
    },

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