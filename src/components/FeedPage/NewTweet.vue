<template>
  <div>
    <section class="show_new_tweet_button">
      <!-- When the image is clicked the variable gets toggled, and the form is shown based off if the variable is true or false, so it toggles the view of our new tweet form. -->
      <img
        @click="show_new_tweet = !show_new_tweet"
        src="@/assets/newtweet.png"
        alt=""
      />
    </section>
    <!-- If show new tweet comes back as true it will show this section on the page -->
    <section v-if="show_new_tweet" class="new_tweet_section">
      <form action="javascript:void(0)" class="new_tweet_form">
        <div class="content_section">
          <label for="new_tweet" class="label_text">Tweet: </label>
          <textarea
            maxlength="200"
            name="new_tweet"
            ref="new_tweet"
            placeholder="New Tweet"
            type="textarea"
            rows="1"
          />
        </div>
        <!-- When clicked we call the new tweet function -->
        <input
          class="new_tweet_button"
          @click="new_tweet"
          type="submit"
          value="Post Tweet"
        />
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: "new-tweet",
  data() {
    return {
      show_new_tweet: false,
    };
  },
  methods: {
    // Getting our login token, and the value from the text area, and making an axios request with that data
    // Then we are calling a mutation and sending the response.data
    // Toggle our show_new tweet variable to remove the new tweet form from the page
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
          this.$store.commit("add_new_tweet", response.data);
          this.show_new_tweet = !this.show_new_tweet;
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "api_message",
            "Sorry something went wrong posting the tweet. Please try again"
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new_tweet_form {
  padding: 10px;
  display: grid;
  gap: 20px;
  place-items: center;
}
.label_text {
  font-weight: 700;
  color: white;
}
.content_section {
  display: grid;
  gap: 10px;

  > textarea {
    width: 250px;
    height: 50px;
  }
}
.new_tweet_button {
  border-radius: 20px;
  border: 1px solid black;
  height: 35px;
  width: 75%;
  background-color: #1d9bf0;
  color: white;
  font-family: sans-serif;
  font-weight: 775;
}
.new_tweet_section {
  display: grid;
  place-items: center;
  position: fixed;
  z-index: 3;
  background-color: grey;
  border: 2px solid black;
  border-radius: 10px;
  width: 90%;
  height: 175px;
  top: calc(50% - 150px);
  left: 5%;
}
.show_new_tweet_button {
  border: 1px solid white;
  border-radius: 50%;
  position: fixed;
  background-color: black;
  bottom: 10px;
  right: 10px;
  > img {
    margin: 10px;
    width: 30px;
    height: 30px;
  }
}
</style>