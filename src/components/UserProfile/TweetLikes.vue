<template>
  <div class="like_section">
    <p ref="like_or_likes"></p>
    <!-- If hasliked variable is false show the first p tag, else show the second. Both call a funtion when clicked -->
    <p class="button" v-if="!has_liked" @click="like_tweet">Like</p>
    <p class="button" v-else @click="unlike_tweet">Unlike</p>
  </div>
</template>

<script>
export default {
  name: "tweet-likes",
  data() {
    return {
      user: this.$cookies.get("user"),
      tweet_likes: [],
      has_liked: false,
    };
  },
  // When component is created, call a function
  created() {
    this.get_tweet_likes();
  },
  methods: {
    // a function to inject the tweet like count on the page
    inject_like_count() {
      // checking to see if this referance basically doesnt exist yet, if it doesnt we return to break the function (used for navigating away from page when tweetlikes axios requests are not done yet)
      if (!this.$refs["like_or_likes"]) {
        return;
      }
      if (this.tweet_likes.length === 1) {
        this.$refs[
          "like_or_likes"
        ].innerText = `${this.tweet_likes.length} Like`;
      } else {
        this.$refs[
          "like_or_likes"
        ].innerText = `${this.tweet_likes.length} Likes`;
      }
    },
    // Looping through an array to check if the logged in user has liked a tweet in the array
    check_user_liked(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].userId === this.user.userId) {
          this.has_liked = true;
        }
      }
    },
    // Function that removes a user like. Sets a variable to false and then removes item from array if userId matches
    remove_user_like() {
      for (var i = 0; i < this.tweet_likes.length; i++) {
        if (this.tweet_likes[i].userId === this.user.userId) {
          this.has_liked = false;
          this.tweet_likes.splice(i, 1);
        }
      }
    },
    unlike_tweet() {
      // Axios delete request to delete a like from a tweet. Send the logintoken and tweetId
      // On success we run a couple functions
      var login_token = this.user.loginToken;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          method: "DELETE",
          data: {
            loginToken: login_token,
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          response;
          this.remove_user_like();
          this.inject_like_count();
        })
        .catch((error) => {
          error;
          this.error_message =
            "Sorry something went wrong! Maybe you already unliked this?";
        });
    },

    like_tweet() {
      // Axios post request to like a tweet. Send the login token and tweetId
      // On success we push an object to an array, set a variable to true and call a function
      var login_token = this.user.loginToken;
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          method: "POST",
          data: {
            loginToken: login_token,
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          response;
          this.tweet_likes.push({
            tweetId: this.tweetId,
            userId: this.user.userId,
            username: this.user.username,
          });
          this.has_liked = true;
          this.inject_like_count();
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong. Please try again later"
          );
        });
    },

    get_tweet_likes() {
      // Axios get request to get the likes of a certain tweetId that we send to the api
      // On success we set an array equal to the data sent back to us
      // Then call two functions
      this.$axios
        .request({
          url: "https://tweeterest.ga/api/tweet-likes",
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          this.tweet_likes = response.data;
          this.check_user_liked(this.tweet_likes);
          this.inject_like_count();
        })
        .catch((error) => {
          console.log(error);
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong with getting tweet likes. Please try again later"
          );
        });
    },
  },
  props: {
    tweetId: Number,
  },
};
</script>

<style scss scoped>
.like_section {
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  font-size: 13px;
  padding-left: 10px;
}

.button {
  padding-top: 4px;
  font-size: 11px;
  font-weight: 700;
}
.button:hover {
  text-decoration: underline;
}
</style>