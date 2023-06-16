<template>



    <div class="comic-container">
  <div class="comic-item">
    <img :src="comic.thumbnail.path + '/portrait_xlarge.jpg'" alt="Comic Thumbnail" class="comic-thumbnail" />
    <div class="comic-details">
      <h2 class="comic-title">{{ comic.title }}</h2>
      <p class="comic-description">{{ comic.description ? comic.description.slice(0, 100) + '...' : 'No description available.' }}</p>
      <p class="comic-creators">Creators: {{ comic.creators.items && comic.creators.items[0] ? comic.creators.items[0].name : 'Anonim' }}</p>
    </div>

    <span class="favorite-icon" @click="toggleFavorite(comic)">
      <fa :icon="isFavorite(comic) ? 'star' : ['far', 'star']" />
    </span>

    <router-link :to="'/comic/' + comic.id" class="comic-detail-button">Detaylar</router-link>
  </div>
</div>

</template>

<script>
export default {
  props: {
    comic: {
      type: Object,
      required: true
    },
    toggleFavorite: {
      type: Function,
      required: true
    },
    isFavorite: {
      type: Function,
      required: true
    }
  }
};
</script>

<style>
.comic-list {
  text-align: center;
  margin-top: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.comic-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.comic-item {
  width: 300px;
  margin: 10px;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}


.comic-thumbnail {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.comic-details {
  text-align: left;
}

.comic-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.comic-description {
  margin-bottom: 10px;
}

.comic-creators {
  font-style: italic;
  color: #888888;
  margin-bottom: 10px;
}

.comic-detail-button{
  background-color: black;
  border: none;
  cursor: pointer;
  padding: 15px;
  color: white;
}


</style>