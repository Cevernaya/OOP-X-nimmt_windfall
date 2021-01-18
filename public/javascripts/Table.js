class Table {

    constructor(card) {
        this.board = []
        const leng = 4
        for (let i = 0; i < leng; i++) {
            this.board.push([card[i]])
        }
    }

    setCard(card) {
        let cardNumber = card[0].number
        let gap = []
        for (let i = 0; i < 4; i++) {
            gap.push(cardNumber - this.board[i].slice(-1)[0].number)
        }
        let num = gap.indexOf(Math.min(...gap.filter((value) => value>0)))
        if (Math.max(...gap) > 0) {
            this.board[num].push(card[0])
            if (this.board[num].length > 6) return false
            else return true
        }
        else {
            return false //줄 선택
        }
    }

    takeCard(card, num) {
        let ret = 0
        for (let i = 0; i < this.board[num].length; i++) {
            ret += this.board[num][i].point
        }
        this.board[num] = [card]
        return ret
    }
}


exports.Table = Table