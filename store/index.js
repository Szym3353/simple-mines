export const state = () => ({
    mapBoxes: [],
    config: {
        numberOfBombs: 50,
        minedBoxesNumbers: [],
        numberOfBoxes: 252,
        lost: false,
        won: false,
        flaggedCorrectly: 0,
        firstClick: true,
    }
})

export const mutations= {
    setMapBoxes(state){
        state.mapBoxes = []
        state.config.flaggedCorrectly = 0
        let minedBoxesNumbers = []
        state.config.firstClick = true,
        state.config.lost=state.config.won=false
        while(minedBoxesNumbers.length != state.config.numberOfBombs){
            let rand = Math.floor(Math.random() * state.config.numberOfBoxes)
            if(!minedBoxesNumbers.includes(rand)) minedBoxesNumbers.push(rand)
        }
        state.config.minedBoxesNumbers = minedBoxesNumbers
        function checkBomb(number){
            return minedBoxesNumbers.includes(number)
        }
        for(let i = 0; i < 252; i++){
            state.mapBoxes.push({ number: i, bomb: checkBomb(i), flagged: false, checked: false, count: 0})
        }
    },
    setCount(state, data){
        let box = state.mapBoxes.find( ({number}) => number === data.currentBoxNumber)
        box.count = data.count
        box.checked = true
        if(state.config.firstClick) state.config.firstClick = false
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
    },
    firstClickedBomb(state, currentBoxNumber){
        let box = state.mapBoxes.find( ({number}) => number === currentBoxNumber)
        box.bomb = false
        let newMinedBoxesNumbers = state.config.minedBoxesNumbers.filter((number) => {
            return number != currentBoxNumber
        })
        while(newMinedBoxesNumbers.length != state.config.numberOfBombs){
            let rand = Math.floor(Math.random() * state.config.numberOfBoxes)
            if(!newMinedBoxesNumbers.includes(rand) && rand != currentBoxNumber) newMinedBoxesNumbers.push(rand)
        }
        state.config.minedBoxesNumbers = newMinedBoxesNumbers
    }
}