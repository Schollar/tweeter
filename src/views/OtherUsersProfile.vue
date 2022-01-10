<template>
  <section class="otheruser_page_body">
    <page-header></page-header>
    <section class="user_info_card">
      <section class="banner_container">
        <img
          class="banner_img"
          v-if="selected_user.bannerUrl === null"
          src="https://www.fillmurray.com/350/200"
          alt=""
        />
        <img v-else class="banner_img" :src="selected_user.bannerUrl" alt="" />
      </section>
      <section class="user_card_header">
        <img
          class="profile_picture"
          v-if="selected_user.imageUrl === null"
          src="@/assets/placeholderpfp.jpg"
          alt=""
        />
        <img
          class="profile_picture"
          v-else
          v-bind:src="selected_user.imageUrl"
          alt="User displayed profile picture"
        />
        <p>{{ selected_user.username }}</p>
        <follow-user
          :hide_link="true"
          :userId="Number($route.params.userId)"
        ></follow-user>
      </section>
      <section class="user_info_content">
        <p>Birthday: {{ selected_user.birthdate }}</p>
        <p>Biography: {{ selected_user.bio }}</p>
      </section>
    </section>
    <section class="user_follow_container">
      <user-followers
        :user_name="selected_user.username"
        :userId="Number($route.params.userId)"
      ></user-followers>
      <people-followed
        :user_name="selected_user.username"
        :userId="Number($route.params.userId)"
      ></people-followed>
    </section>
    <section class="user_tweets_container">
      <show-user-tweets :selected_user="selected_user"></show-user-tweets>
    </section>
  </section>
</template>

<script>
import FollowUser from "../components/GlobalComponents/FollowUser.vue";
import PageHeader from "../components/GlobalComponents/PageHeader.vue";
import PeopleFollowed from "../components/GlobalComponents/PeopleFollowed.vue";
import UserFollowers from "../components/GlobalComponents/UserFollowers.vue";
import ShowUserTweets from "../components/UserProfile/ShowUserTweets.vue";
export default {
  name: "other-users-profile",
  // Checking to see if user exits, is user does not exits send them to the login/signup page
  beforeCreate() {
    var user = this.$cookies.get("user");
    if (!user) {
      this.$router.push({ path: "/" });
    }
  },
  data() {
    return {
      selected_user: {},
    };
  },
  components: {
    FollowUser,
    UserFollowers,
    PeopleFollowed,
    PageHeader,
    ShowUserTweets,
  },
  created() {
    // when created make an axios get request of the userId clicked, then setting an object equal to the data sent back from the api.
    this.$axios
      .request({
        url: "https://tweeterest.ga/api/users",
        method: "GET",
        params: {
          userId: this.$route.params.userId,
        },
      })
      .then((response) => {
        this.selected_user = response.data[0];
      })
      .catch((error) => {
        error;
        this.$root.$emit(
          "api_message",
          "Sorry something went wrong. Please try again later"
        );
      });
  },
};
</script>

<style lang="scss">
.user_follow_container {
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  place-items: center;
}
.otheruser_page_body {
  background: grey;
  height: 100%;
}

.banner_img {
  width: 100%;
}
.user_tweets_container {
  display: grid;
  place-items: center;
  background: grey;
}
.user_info_card {
  display: grid;
  gap: 20px;
  width: 94%;
  margin-left: 10px;
  border: 1px solid black;
}
.user_info_content {
  display: grid;
  place-items: center;
}
.user_card_header {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 80px;
  border-bottom: 1px solid black;

  > .profile_picture {
    width: 50px;
    margin-left: 20px;
    margin-bottom: 5px;
    border-radius: 50%;
  }
}
.banner_container {
  display: grid;
  place-items: center;
}
</style>