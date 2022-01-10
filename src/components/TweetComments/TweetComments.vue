<template>
  <div class="comments_section">
    <section class="show_comments_button_section">
      <!-- A button that toggles a variable to either true or false to show the comments section or hide it -->
      <button
        class="show_comments_button"
        @click="show_comments = !show_comments"
      >
        Show Comments
      </button>
    </section>
    <section class="comment_card_section" v-if="show_comments">
      <!-- Loop through the comments array and show each comment on the screen -->
      <section
        class="comment_card"
        v-for="comment in tweet_comments"
        :key="comment.commentId"
      >
        <!-- These components send an update comment event which this component then runs a function -->
        <!-- Checking to see if the comment userId matches our logged in userId we can show the delete comment and update comment components -->

        <nav class="tweet_comment_header">
          <p>{{ comment.username }}</p>
          <!-- Passing a prop to this component for styling purposes -->
          <follow-user :userId="comment.userId" :is_small="true"></follow-user>
          <update-comment
            @update_comments="show_tweet_comments"
            v-if="comment.userId === user.userId"
            :commentId="comment.commentId"
          ></update-comment>
          <delete-comment
            @update_comments="show_tweet_comments"
            v-if="comment.userId === user.userId"
            :commentId="comment.commentId"
          ></delete-comment>
        </nav>
        <section class="comment_data_container">
          <p>{{ comment.content }}</p>
          <p class="created_at">{{ comment.createdAt }}</p>
        </section>
        <comment-likes :commentId="comment.commentId"></comment-likes>
      </section>
    </section>
  </div>
</template>

<script>
import CommentLikes from "./CommentLikes.vue";
import DeleteComment from "./DeleteComment.vue";
import UpdateComment from "./UpdateComment.vue";
import FollowUser from "../GlobalComponents/FollowUser.vue";
export default {
  components: { CommentLikes, DeleteComment, UpdateComment, FollowUser },
  name: "tweet-comments",
  data() {
    return {
      user: this.$cookies.get("user"),
      show_comments: false,
      tweet_comments: [],
    };
  },
  // Listening for a global event that calls a function
  // Also calling function when component is mounted
  mounted() {
    this.$root.$on("update_comments", this.show_tweet_comments);
    this.show_tweet_comments();
  },
  props: {
    tweetId: Number,
  },
  methods: {
    // Axios get request that gets all the comments of the tweetId that we send to it.
    // Upon success we set an array equal to the data sent back to us
    show_tweet_comments() {
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/comments",
          methods: "GET",
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          this.tweet_comments = response.data;
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong showing the tweet comments. Please try again later."
          );
        });
    },
  },
};
</script>

<style  lang="scss" scoped>
.tweet_comment_header {
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  gap: 20px;
  width: 100%;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  > p {
    margin-left: 15px;
  }
}
.comment_card_section {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}
.show_comments_button_section {
  display: grid;
  place-items: center;
}

.comments_section {
  margin-bottom: 10px;
}
.comment_card {
  display: grid;
  place-items: center;
}
.created_at {
  font-size: 10px;
}
.show_comments_button {
  border-radius: 20px;
  border: 1px solid black;
  height: 25px;
  background-color: #1d9bf0;
  color: white;
  font-family: sans-serif;
  font-weight: 775;
}
.comment_data_container {
  display: grid;
  width: 90%;
}
</style>