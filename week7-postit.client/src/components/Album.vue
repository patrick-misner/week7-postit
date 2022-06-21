<template>
        <div @click="selectAlbum" class="div bg-white elevation-3 rounded m-3 d-flex flex-column text-center justify-content-center hover selectable">
        <div>
           <h1>{{ album.name }}</h1>
        </div>
       
        <div>
        <img :src="album.coverImg" class="img-fluid" alt="">
        </div>

      </div>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  props: { album: { type: Object, required: true }},
  setup(props){
    const router = useRouter()
    return {
      selectAlbum() {
        router.push({ name: 'AlbumDetails', params: { id: props.album.id}})
      }
    }

  }

}
</script>

<style>

</style>