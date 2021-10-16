export const state = () => ({
    mapBoxes: [],
    config: {
        numberOfBombs: 55,
        numberOfBoxes: 252,
        lost: false,
        won: false,
        flaggedCorrectly: 0,
    }
})

export const mutations= {
    setMapBoxes(state, boxes){
        state.mapBoxes = boxes
    },
    setCount(state, data){
        let box = state.mapBoxes.find( ({number}) => number === data.currentBoxNumber)
        box.count = data.count
        box.checked = true
    },
    lostGame(state){
        state.config.lost = true
    },
    flag(state, currentBoxNumber){
        let box = state.mapBoxes.find( ({number}) => number === currentBoxNumber)
        if(box.flagged) {
            if(box.bomb){
                state.config.flaggedCorrectly-=1
            }
            box.flagged = false
        }else if(!box.flagged){
            if(box.bomb){
                state.config.flaggedCorrectly+=1
                if(state.config.flaggedCorrectly == state.config.numberOfBombs) state.config.won = true
            }
            box.flagged = true
        }
    }
}