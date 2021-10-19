<template>
    <div class='mx-auto py-10 l-0 r-0 w-full text-center top-1/2 transform -translate-y-1/2 absolute bg-gray-900 text-white uppercase text-lg font-bold'>
      <div v-if="$store.state.config.won">Wygrałeś</div>  
      <div v-if="$store.state.config.lost">Przegrałeś</div>
      <p class="text-sm text-white font-bold">{{$store.state.config.flaggedCorrectly}} / {{$store.state.config.numberOfBombs}}</p>
      <button @click="$store.commit('setMapBoxes')" class="bg-transparent text-green-500 animate-pulse text-sm px-5 py-0.5 mt-3 border rounded border-green-500">Zagraj ponownie</button> 
    </div>
</template>