class Player{
    constructor(num) {
        this.num = num
        let leftPoint = 63
        this.point = leftPoint
        this.hand = []
    }
    choiseHand(num){
        return this.hand.splice(num-1,0)
    }
}

exports.Player = Player