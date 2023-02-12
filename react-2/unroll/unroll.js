function checkIfSquare (arr) {
    const length = arr.length
    const isSquare = arr.every(row=>{
        return row.length === length
    })
    return isSquare
}

function reduce (arr, dir) {
    if (dir === "right"){
        const reduced = arr.reduce((initial, curr, idx)=>{
            if (idx === 0){
                return `${curr}`
            }
            return `${initial} ${curr}`
        },"")
        return reduced
    }
    else if (dir === "left") {
        const reduced = arr.reduce((initial, curr, idx)=>{
            if (idx === 0){
                return `${curr}`
            }
            return `${curr} ${initial}`
        },"")
        return reduced
    }
}

function getTop (arr) {
    const top = arr.shift()
    const topToString = reduce(top, "right")
    return topToString 
}

function getRight (arr) {
    const right = arr.map(row=>{
        const num = row.pop()
        return num
    })
    const rightToString = reduce(right, "right")
    return rightToString    
}

function getBottom (arr) {
    const bottom = arr.pop()
    const bottomToString = reduce(bottom, "left")
    return bottomToString
}

function getLeft (arr) {
    const left = arr.map(row=>{
        const num = row.shift()
        return num
    })
    const leftToString = reduce(left, "left")
    return leftToString
}

function copyArray (arr) {
    const copy = []
    arr.forEach(row=>{
        const copiedRow = [...row]
        copy.push(copiedRow)
    })
    return copy
}

class SquareError extends Error {
    constructor(message){
        super(message)
        this.name = "SquareError"
    }
}

function unroll(squareArray) {
    try{
        if (!checkIfSquare(squareArray)) {
            throw new SquareError("Not a square array")
        }
        const copy = copyArray(squareArray)
        const initialLength = copy.length
        let output = ""
        while (copy.length > 1){
            output += ` ${getTop(copy)}`
            output += ` ${getRight(copy)}`
            output += ` ${getBottom(copy)}`
            output += ` ${getLeft(copy)}`
        }
        if (initialLength % 2 === 1) {
            output += ` ${copy[0][0]}`
        }
        return output.trim()
    }
    catch(e){
        return e.message
    }
}


module.exports = {unroll, SquareError};