<template>
  <div class="tweet_card">
    <nav class="tweet_card_header">
      <!-- If user doesnt have a profile picture set, we set it to a placeholder -->
      <img
        class="user_profile_picture"
        v-if="tweet.userImageUrl === null"
        src="@/assets/placeholderpfp.jpg"
        alt=""
      />
      <img
        class="user_profile_picture"
        v-else
        :src="tweet.userImageUrl"
        alt="User profile picture"
      />
      <!-- Set a router link to each username on the tweet card so users can click the name and get sent to the clicked users profile -->
      <p>
        <router-link :to="`/users/${tweet.userId}`">
          {{ tweet.username }}
        </router-link>
      </p>
      <!-- Pass the userId to the components that need it -->
      <!-- Follow user gets some custon props sent for styling purposes -->
      <follow-user
        :hide_link="false"
        :userId="tweet.userId"
        :is_normal="true"
      ></follow-user>
      <!-- If the userId matches the tweets userId we can show the update tweet and delete tweet components -->
      <update-tweet
        v-if="tweet.userId === user.userId"
        :tweetId="tweet.tweetId"
      ></update-tweet>
      <delete-tweet
        v-if="tweet.userId === user.userId"
        :tweetId="tweet.tweetId"
      ></delete-tweet>
    </nav>
    <section class="tweet_content_section">
      <p>{{ tweet.content }}</p>
      <p class="tweet_date">{{ tweet.createdAt }}</p>
    </section>
    <section class="likes_comments_section">
      <!-- We pass the tweetId to each component -->
      <tweet-likes :tweetId="tweet.tweetId"></tweet-likes>
      <new-comment :tweetId="tweet.tweetId"></new-comment>
    </section>
    <tweet-comments :tweetId="tweet.tweetId"></tweet-comments>
  </div>
</template>

<script>
import DeleteTweet from "../GlobalComponents/DeleteTweet.vue";
import UpdateTweet from "../GlobalComponents/UpdateTweet.vue";
import NewComment from "../TweetComments/NewComment.vue";
import TweetComments from "../TweetComments/TweetComments.vue";
import TweetLikes from "../UserProfile/TweetLikes.vue";
import FollowUser from "../GlobalComponents/FollowUser.vue";
export default {
  name: "user-tweet",
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  props: {
    show_link: Boolean,
    tweet: Object,
  },
  components: {
    TweetLikes,
    NewComment,
    TweetComments,
    UpdateTweet,
    DeleteTweet,
    FollowUser,
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