<template>
    <div @click="click({numberClicked: data.number, checkedNumbers: []})" @contextmenu.prevent="flag" class="box w-8 h-8 cursor-pointer hover:bg-gray-400 transition-colors flex justify-center items-center" :class="{'bg-gray-900': data.checked, 'text-white': data.checked, 'bg-green-500': !data.checked}">
        <span v-if="data.count > 0">
            {{data.count}}
        </span>
        <svg v-if="data.flagged" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
    </div>
</template>
<script>
export default {
    props: ['data'],
    methods: {
        flag(){
            this.$store.commit('flag', this.data.number)
        },
        click(currentBoxData){
            console.log('Clicked box ', currentBoxData)
            let store = this.$store
            const currentBox = store.state.mapBoxes.find( ({number}) => number === currentBoxData.numberClicked)
            if(store.state.config.lost || store.state.config.won || currentBox.flagged) return
            let count = 0
            function check(number){
                if(store.state.mapBoxes[number].bomb) count = count + 1
            }
            if(!currentBox.clicked && !currentBox.flagged){
                if(currentBox.bomb){
                    store.commit('lostGame')
                }else{
                    let currentBoxNumber = currentBoxData.numberClicked
                    //BORDERS
                    if(currentBoxNumber > 0 && currentBoxNumber < 13){
                        check(currentBoxNumber + 1)
                        check(currentBoxNumber - 1)
                        check(currentBoxNumber + 13)
                        check(currentBoxNumber + 14)
                        check(currentBoxNumber + 15)
                    }
                    else if(currentBoxNumber > 238 && currentBoxNumber < 251){
                        check(currentBoxNumber + 1)
                        check(currentBoxNumber - 1)
                        check(currentBoxNumber - 15)
                        check(currentBoxNumber - 14)
                        check(currentBoxNumber - 13)
                    }
                    else if(currentBoxNumber % 14 == 0 && currentBoxNumber > 0 && currentBoxNumber < 238){
                        check(currentBoxNumber + 1)
                        check(currentBoxNumber + 14)
                        check(currentBoxNumber - 14)
                        check(currentBoxNumber - 13)
                        check(currentBoxNumber + 15)
                    }
                    else if((currentBoxNumber + 1) % 14 == 0 && currentBoxNumber > 13 && currentBoxNumber < 251){
                        check(currentBoxNumber - 1)
                        check(currentBoxNumber + 14)
                        check(currentBoxNumber - 14)
                        check(currentBoxNumber - 15)
                        check(currentBoxNumber + 13)
                    }

                    //CORNERS
                    else if(currentBoxNumber == 0){
                        check(currentBoxNumber + 1)
                        check(currentBoxNumber + 14)
                        check(currentBoxNumber + 15)
                    }
                    else if(currentBoxNumber == 13){
                        check(currentBoxNumber - 1)
                        check(currentBoxNumber + 13)
                        check(currentBoxNumber + 14)
                    }
                    else if(currentBoxNumber == 238){
                        check(currentBoxNumber + 1)
                        check(currentBoxNumber - 14)
                        check(currentBoxNumber - 13)
                    }
                    else if(currentBoxNumber == 251){
                        check(currentBoxNumber - 1)
                        check(currentBoxNumber - 15)
                        check(currentBoxNumber - 14)
                    }


                    else{
                        console.log('else')
                        check(currentBoxNumber + 1)
                        check(currentBoxNumber - 1)
                        check(currentBoxNumber - 15)
                        check(currentBoxNumber - 14)
                        check(currentBoxNumber - 13)
                        check(currentBoxNumber + 13)
                        check(currentBoxNumber + 14)
                        check(currentBoxNumber + 15)
                    }
                    let checkedNumbers = currentBoxData.checkedNumbers
                    checkedNumbers.push(currentBoxNumber)
                    if(count == 0){
                        if(currentBoxNumber > 0 && currentBoxNumber < 13){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 1)) this.click({numberClicked: (currentBoxNumber - 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 1)) this.click({numberClicked: (currentBoxNumber + 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 13)) this.click({numberClicked: (currentBoxNumber + 13), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 14)) this.click({numberClicked: (currentBoxNumber + 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 15)) this.click({numberClicked: (currentBoxNumber + 15), checkedNumbers: checkedNumbers})
                        }
                        else if(currentBoxNumber > 238 && currentBoxNumber < 251){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 1)) this.click({numberClicked: (currentBoxNumber + 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 1)) this.click({numberClicked: (currentBoxNumber - 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 15)) this.click({numberClicked: (currentBoxNumber - 15), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 14)) this.click({numberClicked: (currentBoxNumber - 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 13)) this.click({numberClicked: (currentBoxNumber - 13), checkedNumbers: checkedNumbers})
                        }
                        else if(currentBoxNumber % 14 == 0 && currentBoxNumber > 0 && currentBoxNumber < 238){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 1)) this.click({numberClicked: (currentBoxNumber + 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 14)) this.click({numberClicked: (currentBoxNumber + 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 15)) this.click({numberClicked: (currentBoxNumber + 15), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 14)) this.click({numberClicked: (currentBoxNumber - 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 13)) this.click({numberClicked: (currentBoxNumber - 13), checkedNumbers: checkedNumbers})
                        }
                        else if((currentBoxNumber + 1) % 14 == 0 && currentBoxNumber > 13 && currentBoxNumber < 251){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 1)) this.click({numberClicked: (currentBoxNumber - 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 14)) this.click({numberClicked: (currentBoxNumber - 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 15)) this.click({numberClicked: (currentBoxNumber - 15), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 13)) this.click({numberClicked: (currentBoxNumber + 13), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 14)) this.click({numberClicked: (currentBoxNumber + 14), checkedNumbers: checkedNumbers})
                        }

                        //CORNERS
                        else if(currentBoxNumber == 0){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 1)) this.click({numberClicked: (currentBoxNumber + 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 14)) this.click({numberClicked: (currentBoxNumber + 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 15)) this.click({numberClicked: (currentBoxNumber + 15), checkedNumbers: checkedNumbers})
                        }
                        else if(currentBoxNumber == 13){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 1)) this.click({numberClicked: (currentBoxNumber - 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 13)) this.click({numberClicked: (currentBoxNumber + 13), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 14)) this.click({numberClicked: (currentBoxNumber + 14), checkedNumbers: checkedNumbers})
                        }
                        else if(currentBoxNumber == 238){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 1)) this.click({numberClicked: (currentBoxNumber + 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 13)) this.click({numberClicked: (currentBoxNumber - 13), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 14)) this.click({numberClicked: (currentBoxNumber - 14), checkedNumbers: checkedNumbers})
                        }
                        else if(currentBoxNumber == 251){
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 1)) this.click({numberClicked: (currentBoxNumber - 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 14)) this.click({numberClicked: (currentBoxNumber - 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 15)) this.click({numberClicked: (currentBoxNumber - 15), checkedNumbers: checkedNumbers})
                        }

                        else{
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 1)) this.click({numberClicked: (currentBoxNumber - 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 1)) this.click({numberClicked: (currentBoxNumber + 1), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 13)) this.click({numberClicked: (currentBoxNumber + 13), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 14)) this.click({numberClicked: (currentBoxNumber + 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber + 15)) this.click({numberClicked: (currentBoxNumber + 15), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 13)) this.click({numberClicked: (currentBoxNumber - 13), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 14)) this.click({numberClicked: (currentBoxNumber - 14), checkedNumbers: checkedNumbers})
                            if(!currentBoxData.checkedNumbers.includes(currentBoxNumber - 15)) this.click({numberClicked: (currentBoxNumber - 15), checkedNumbers: checkedNumbers})
                        }
                    }
                    store.commit('setCount', {currentBoxNumber, count})
                }
            }
        }
    }
}
</script>
<style>
    
</style>