<template>
  <div class="container-fluid">
  
    <div class="row justify-content-center">
  
      <div class="col-md-4 text-center m-2 ">
      <h2>Pictures!</h2>
        
<Picture v-for="p in pictures" :key="p.id" :picture="p" />

      </div>
      <div class="col-md-4">
        <div class="bg-white elevation-2 m-4">
          MEMBERS:
          <ul>
            <li>{{ member.name }}</li>
          </ul>
        </div>

      </div>



    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { albumsService } from "../services/AlbumsService"
import { useRoute } from "vue-router"
import { picturesService } from "../services/PicturesService"
export default {
setup(){
const route = useRoute()
onMounted( async ()=> {
  try {
    await picturesService.getPictures(route.params.id)
    await albumMembersService.getMembers(route.params.id)
  } catch (error) {
    logger.error(error)
    Pop.toast(error.message, 'error')
  }
})
return{
  pictures: computed(()=> AppState.pictures)
}
}


}
</script>

<style>

</style>