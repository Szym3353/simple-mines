<template>
    <div class="mx-auto w-105 relative flex justify-center">
        <Information v-if="$store.state.config.won == true || $store.state.config.lost == true" />
        <div class="boxes flex flex-wrap">
            <SingleBox v-for="(box, key) in $store.state.mapBoxes" :data="box" :key="key" />
        </div>
    </div>
</template>
<script>
export default {
    mounted(){
        this.$store.commit('setMapBoxes')
    }
}
</script>