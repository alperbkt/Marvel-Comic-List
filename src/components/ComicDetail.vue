<template>
  <div class="comic-details-page">

    <div class="comic-details-area">
      <div class="col-md-6 comic-details-thumbnail-area">
        <div class="comic-little-thumbnail-div">
          <img v-if="comic.thumbnail" :src="comic.thumbnail.path + '/portrait_xlarge.jpg'" alt="Comic Thumbnail"
            class="comic-details-thumbnail" />
        </div>




      </div>
      <div class="col-md-6 comic-details-details-area">

        <div class="comic-card">
          <h2 class="comic-title-big">{{ comic.title }}</h2>
          <p class="comic-description">{{ comic.description ? comic.description : 'No description available.' }}</p>
          <p class="comic-pagecount">{{ comic.pageCount ? 'Page Count: ' + comic.pageCount : ' Page Count: Unknown' }}</p>
          <p class="comic-creators">Creators: {{ comic.creators && comic.creators.items && comic.creators.items[0] ?
            comic.creators.items[0].name : 'Anonim' }}</p>
        </div>

      </div>
    </div>


    <!-- Diğer comic detayları -->
  </div>
</template>
  
<script>
import axios from 'axios';
import md5 from 'md5';

export default {
  data() {
    return {
      comic: {},
      publicKey: '22285b21c7c8c3929ca6ce8d3b137097',
      privateKey: '84e6c970956dc7bbc4f3faad600761a8d539b41e',
    };
  },
  created() {
    this.fetchComic();
  },
  methods: {
    fetchComic() {
      const comicId = this.$route.params.id;

      const baseUrl = `http://gateway.marvel.com/v1/public/comics/${comicId}`;
      const ts = Math.floor(Date.now() / 1000);
      const hash = md5(`${ts}${this.privateKey}${this.publicKey}`);

      const params = {
        ts: ts,
        apikey: this.publicKey,
        hash: hash,
      };

      axios
        .get(baseUrl, { params })
        .then((response) => {
          this.comic = response.data.data.results[0];
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>

.comic-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comic-details-page {
  display: flex;
  margin-top: 110px;
  background: linear-gradient(0deg, rgb(205 205 205) 15%, rgba(52, 77, 156, 1) 75%);
  height: 88.6vh;
}

.comic-details-area {
  display: flex;
  background-color: rgb(255 255 255 / 68%);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 80%;
  padding: 30px;
  border-radius: 15px;
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;
}

.comic-details-thumbnail-area {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comic-details-thumbnail {
  max-width: 450px;
  min-width: 450px;
  height: auto;
  border-radius: 15px;
  object-fit: cover;
}

.comic-details-details-area {
  width: 50%;
  color: rgb(0, 0, 0);
}

@media screen and (max-width: 1160px) {
  .comic-card{
    font-size: 13px;
  }
  .comic-details-area {
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  }

  .comic-details-thumbnail-area {
    width: 100%;
    height: 70%;
    align-items: flex-start;
  }

  .comic-little-thumbnail-div {
    width: 40%;
  }

  .comic-little-title-div {
    width: 60%;
    display: none;
  }

  .comic-details-thumbnail {
    width: 100%;
    min-width: 280px;
    max-width: 320px;
  }

  .comic-details-details-area {
    width: 100%;
    height: 30%;
  }

}

@media screen and (max-width: 800px) {
  .comic-details-thumbnail-area {
    flex-direction: column-reverse;
    align-items: center !important;
    height: 60%;
  }

  .comic-details-details-area {
    height: 40%;
  }

  .comic-little-thumbnail-div {
    width: 100%;
  }

  .comic-details-thumbnail {
    max-width: 280px;
  }

  .comic-little-title-div {
    width: 100%;
  }

  .comic-card {
    font-size: 12px;
  }
}</style>