import { createStore } from 'vuex'

export default createStore({
  state: {
      favoriteCount: 0,
      favorites: [], // Favori comic'leri tutan dizi
  },
  computed: {
    favoriteCount() {
      return this.$store.getters.getFavoriteCount;
    },
  },
  mutations: {
    ADD_FAVORITE(state, comic) {
      state.favorites.push(comic);
      state.favoriteCount++;
    },
    REMOVE_FAVORITE(state, comic) {
      state.favorites = state.favorites.filter(item => item !== comic);
      state.favoriteCount--;
    },
    incrementFavoriteCount(state) {
      state.favoriteCount++;
    },
    decrementFavoriteCount(state) {
      state.favoriteCount--;
    },
  },
  actions: {
    incrementFavorite({ commit }) {
      commit('incrementFavoriteCount');
    },
    decrementFavorite({ commit }) {
      commit('decrementFavoriteCount');
    },
    setFavorites({ commit }, favorites) {
      commit('SET_FAVORITES', favorites);
    },
  },
  getters: {
    getFavorites(state) {
      return state.favorites;
    },
    getFavoriteCount(state) {
      return state.favoriteCount;
    },
  },
})
