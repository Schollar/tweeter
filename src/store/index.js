import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    other_users: [],
    tweets: [],
    user: {},
    user_tweets: [],
    selected_user: {},
    tweet_comments: [],

  },
  mutations: {
    update_tweet_comments(state, payload) {
      state.tweet_comments = payload
    },
    update_selected_user(state, payload) {
      state.selected_user = payload
    },
    update_users(state, payload) {
      state.other_users = payload
    },
    update_user_tweets(state, payload) {
      state.user_tweets = payload
    },
    update_info(state, payload) {
      state.user[payload["field"]] = payload.val
    },
    add_new_tweet(state, payload) {
      state.tweets.push(payload);
    },
    get_tweets(state, payload) {
      state.tweets = payload
    },
    update_user(state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
