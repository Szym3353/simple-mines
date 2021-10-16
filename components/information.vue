<template>
    <div class='mx-auto py-10 l-0 r-0 w-full text-center top-1/2 transform -translate-y-1/2 absolute bg-gray-900 text-white uppercase text-lg font-bold'>
      <div v-if="$store.state.config.won">Wygrałeś</div>  
      <div v-if="$store.state.config.lost">Przegrałeś</div>
      <p class="text-xs py-2 font-normal">Odśwież stronę aby zagrać ponownie.</p>  
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>