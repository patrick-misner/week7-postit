<template>
  <div class="container-fluid">
    <div class="row">
     <div class="col-2"></div>


     <div class="col-8">
        <Album v-for="a in albums" :key="a.id" :album="a" />
     </div>



     <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { albumsService } from "../services/AlbumsService"
export default {
  name: 'Home',
  
  setup(){
    onMounted(async ()=> {
      try {
        await albumsService.getAlbums()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return{
      albums: computed(()=> AppState.albums)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
