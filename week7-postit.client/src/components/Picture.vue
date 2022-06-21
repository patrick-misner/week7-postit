<template>

<div class="bg-white elevation-2 m-3">
  <img class="img-fluid" :src="picture.imgURL" alt="">

  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: { picture: {type: Object, required: true}},
  setup(props){
    return{
      account: computed(()=> AppState.account)
    }
  }

}
</script>

<style>

</style>