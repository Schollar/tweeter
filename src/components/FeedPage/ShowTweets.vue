<template>
  <section class="tweet_section">
    <section
      v-for="tweet in user_tweets.reverse()"
      :key="tweet.tweetId"
      class="tweet_card"
    >
      <nav class="tweet_card_header">
        <img
          class="user_profile_picture"
          v-if="tweet.userImageUrl === null"
          src="http://placeskull.com/50"
          alt=""
        />
        <img
          class="user_profile_picture"
          v-else
          :src="tweet.userImageUrl"
          alt="User profile picture"
        />

        <p>
          <router-link :to="`/users/${tweet.userId}`">
            {{ tweet.username }}
          </router-link>
        </p>

        <follow-user :userId="tweet.userId" :is_normal="true"></follow-user>
        <update-tweet
          v-if="tweet.userId === user.userId"
          :tweetId="tweet.tweetId"
          @update_tweets="show_tweets()"
        ></update-tweet>
        <delete-tweet
          v-if="tweet.userId === user.userId"
          :tweetId="tweet.tweetId"
          @update_tweets="show_tweets"
        ></delete-tweet>
      </nav>
      <section class="tweet_content_section">
        <p>{{ tweet.content }}</p>
        <p class="tweet_date">{{ tweet.createdAt }}</p>
      </section>
      <section class="likes_comments_section">
        <tweet-likes :tweetId="tweet.tweetId"></tweet-likes>
        <new-comment :tweetId="tweet.tweetId"></new-comment>
      </section>
      <tweet-comments :tweetId="tweet.tweetId"></tweet-comments>
    </section>
  </section>
</template>

<script>
import DeleteTweet from "../GlobalComponents/DeleteTweet.vue";
import UpdateTweet from "../GlobalComponents/UpdateTweet.vue";
import NewComment from "../TweetComments/NewComment.vue";
import TweetComments from "../TweetComments/TweetComments.vue";
import TweetLikes from "../UserProfile/TweetLikes.vue";
import FollowUser from "../GlobalComponents/FollowUser.vue";
export default {
  components: {
    TweetLikes,
    NewComment,
    TweetComments,
    UpdateTweet,
    DeleteTweet,
    FollowUser,
  },
  name: "show-tweets",
  computed: {
    tweets() {
      return this.$store.state["tweets"];
    },
    other_users() {
      return this.$store.state["other_users"];
    },
  },
  data() {
    return {
      user: this.$cookies.get("user"),
      new_tweets: [],
      user_tweets: [],
    };
  },
  created: function () {
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
          this.user_tweets = response.data.sort(function (a, b) {
            return a.tweetId - b.tweetId;
          });
          // this.$store.commit("get_tweets", response.data);
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong showing the tweets. Please try again later"
          );
        });
    },
  },
};
</script>

<style scoped>
.tweet_content_section {
  border-bottom: 1px solid black;
  display: grid;
  width: 280px;
  padding-left: 20px;
}
.tweet_section {
  display: grid;
  gap: 25px;
}
.tweet_card {
  display: grid;
  width: 300px;
  max-width: 400px;
  border: 1px solid black;
  border-radius: 10px;
}

.tweet_date {
  font-size: 10px;
}

.tweet_card_header {
  font-size: 13px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 50px;
  width: 275px;
  padding-left: 25px;
  margin-top: 5px;
  align-self: center;
  border-bottom: 1px solid black;
}

.user_profile_picture {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.likes_comments_section {
  display: grid;
  position: relative;
  border-bottom: 1px solid black;
  grid-auto-flow: column;
  width: 100%;
  margin-bottom: 10px;
  grid-template-columns: 40%;
}
</style>