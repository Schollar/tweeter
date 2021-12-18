import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [],
    user: {}
  },
  mutations: {
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
