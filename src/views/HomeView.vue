<template>
 <div>
    <img style="width: 100%; height: 600px; object-fit: cover; " src='../../src/assets/marvel-comic-book.jpg'>
    


    <ComicsList />
  </div>
</template>

<script>

import ComicsList from '@/components/ComicsList.vue';
export default {

  components: {
    ComicsList,
  },

}
</script>
