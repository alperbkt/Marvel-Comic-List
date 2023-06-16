<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/"><img style="width: 80px;" src='../src/assets/marvel-comics-logo.png'/></router-link>
    </div>
    
     
    <div class="favorite-badge" ref="favoriteBadge" @click="toggleFavoriteArea">
      <fa class="favorite-star" :icon="['fas', 'star']"/>
      <span class="favorite-count">{{ favoriteCount }}</span>
    <div class="favorite-area"  v-if="isActive">
      <div style="margin-bottom: 10px;"> <h2>Favoriler</h2></div>
      <div class="favorite-card" v-for="favorite in favoriteList" :key="favorite.id" @click="redirectToComic(favorite.id)">
          <img style="width: 50px;" :src="favorite.thumbnail.path + '/portrait_xlarge.jpg'" alt="Favorite Comic" />
          <p>{{ favorite.title }}</p>
        </div>
    </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>

import { mapState } from 'vuex';
export default {
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    ...mapState(['favoriteCount']),
    favoriteList() {
      return this.$store.state.favorites;
    },
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount () {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    toggleFavoriteArea() {
      this.isActive = !this.isActive;
    },
    redirectToComic(favoriteId) {
    this.$router.replace('/comic/' + favoriteId);
  }
  },
  handleOutsideClick(event) {
      if (!this.$refs.favoriteBadge.contains(event.target)) {
        this.isActive = false;
      }
    }

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 110px;
  background-color: #ffffff75;
  z-index: 1;
  transition: background-color 0.3s ease;
}
.navbar:hover{
  background-color: #ffffff;
}
.navbar-logo{
  margin-left: 100px;
}
.favorite-badge{
  margin-right: 100px;
  cursor: pointer;
  position: relative;
}
.favorite-star{
  font-size: 45px;
  color: gold;
}
.favorite-count{
  position: absolute;
  left: 20px;
  top: 16px;
  font-weight: 700;
}
.favorite-area{
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: absolute;
  top: 60px;
  left: -75px;
  width: 150px;
  background-color: #42b983;
  border-radius: 10px;
  overflow-y: auto; /* Kaydırma özelliği */
  max-height: 800px; /* Yükseklik sınırlaması */

}
.navbar a {
  font-weight: bold;
  color: #2c3e50;
}

.navbar a.router-link-exact-active {
  color: #42b983;
}
</style>
