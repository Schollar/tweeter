import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: []
  },
  mutations: {
    add_new_tweet(state, payload) {
      state.tweets.push(payload);
    },
    get_tweets(state, payload) {
      state.tweets = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
