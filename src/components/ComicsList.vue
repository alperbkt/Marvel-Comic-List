<template>
  <div class="comic-list">
    <h1 class="title">Comics</h1>
  <div class="comic-container">
    <ComicsListCard v-for="comic in comics" :key="comic.id" :comic="comic" :toggleFavorite="toggleFavorite" :isFavorite="isFavorite" />
  </div>
  </div>
</template>
  
  
<script>

import axios from 'axios';
import md5 from "md5";
import { mapState,mapMutations } from 'vuex';
import ComicsListCard from '@/components/ComicsListCard.vue';
export default {
  components: {
    ComicsListCard
  },
  data() {
    return {
      comics: [],
      favorites: [],
      publicKey: '22285b21c7c8c3929ca6ce8d3b137097',
      privateKey: '84e6c970956dc7bbc4f3faad600761a8d539b41e',
    };
  },
  computed: {
    ...mapState(['favoriteCount']),
    favoriteList() {
      return this.$store.state.favorites;
    },
  },
  mounted() {
    this.fetchComics();
  },
  methods: {
    fetchComics() {
      const baseUrl = 'http://gateway.marvel.com/v1/public/comics';
      const ts = Math.floor(Date.now() / 1000);
      const hash = md5(`${ts}${this.privateKey}${this.publicKey}`);

      const params = {
        ts: ts,
        apikey: this.publicKey,
        hash: hash,
      };


      axios.get(baseUrl, { params })
        .then((response) => {
          this.comics = response.data.data.results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    isFavorite(comic) {
      return this.$store.getters.getFavorites.includes(comic);
    },
    ...mapMutations(['ADD_FAVORITE', 'REMOVE_FAVORITE']),
    toggleFavorite(comic) {
      if (this.isFavorite(comic)) {
        this.REMOVE_FAVORITE(comic);
      } else {
        this.ADD_FAVORITE(comic);
      }
    },
  },
};


</script>

<style>
.favorite-icon {
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  background-size: cover;
  color: gold;
  margin-right: 10px;
}
.favorite-icon svg{
  width: 100%;
  height: 100%;
}

</style>