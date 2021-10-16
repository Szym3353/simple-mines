<template>
    <div class="mx-auto w-105 relative">
        <div class="score-board"></div>
        <Information v-if="$store.state.config.won == true || $store.state.config.lost == true" />
        <div class="boxes flex flex-wrap">
            <SingleBox v-for="(box, key) in boxes" :data="box" :key="key" />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            boxes: [],
            firstClick: true,
        }
    },
    mounted(){
        let minedBoxes = Array.from({length: this.$store.state.config.numberOfBombs}, () => Math.floor(Math.random() * this.$store.state.config.numberOfBoxes));
        function checkBomb(number){
            return minedBoxes.includes(number)
        }
        for(let i = 0; i < 252; i++){
            this.boxes.push({ number: i, bomb: checkBomb(i), flagged: false, checked: false, count: 0})
        }
        this.$store.commit('setMapBoxes', this.boxes)
    }

}
</script>
<style>
    
</style>