class Card {
    constructor (order) {
        this.number = order
        this.point = this.setPoint(order)
    }
    setPoint(num){
      if (num == 55) return 7
      else if (num % 11 == 0) return 5
      else if (num % 10 == 0) return 3
      else if (num % 5 == 0) return 2
      else return 1
    }
}

exports.Card = Card