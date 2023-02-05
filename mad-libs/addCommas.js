function addCommas(num) {
    const numToString = `${num}`;
        const splitByDecimal = numToString.split(".")
        let finalNum = splitByDecimal[0]
        let decimal = splitByDecimal[1]

    const numLength = finalNum.length

    let numWithCommas = ""
    let counter = 0
    for (let idx = numLength - 1; idx >= 0; idx--) {
        counter += 1;
        if (counter % 3 === 0 && idx === 1 && num < 0) {
            numWithCommas = `${finalNum[idx]}${numWithCommas}`
        }
        else if (counter % 3 === 0 && idx >= 1) {
            numWithCommas = `,${finalNum[idx]}${numWithCommas}`
        }
        else{
            numWithCommas = `${finalNum[idx]}${numWithCommas}`
        }
    }

    if (decimal) {
        numWithCommas = `${numWithCommas}.${decimal}`
    }
        return numWithCommas
}

module.exports = addCommas;