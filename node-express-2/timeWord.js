/** Turn a string of 24 hours into words*/

const hours = {
    "00" : "twelve",
    "01" : "one",
    "02" : "two",
    "03" : "three",
    "04" : "four",
    "05" : "five",
    "06" : "six",
    "07" : "seven",
    "08" : "eight",
    "09" : "nine",
    "10" : "ten",
    "11" : "eleven",
    "12" : "twelve"
}

const ones = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const tenToTwenty = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
const tenths = ["twenty", "thirty", "fourty", "fifty"]

let minutes = {};

function addOnes(startNum, tenths, container){
    ones.forEach((num, idx)=>{
        const numerical = `${startNum}${idx + 1}`;
        container[numerical] = tenths + " " + num;
    })
}

function timeWord(time) {
    const times = time.split(":")
    const hour = times[0]
    const minute = times[1]
    let convertedHour = parseInt(hour)
    let amOrPm = 'am';
    
    let hoursinWords;
    let minutesinWords
    if (convertedHour > 12) {
        convertedHour -= 12;
        amOrPm = 'pm';
    }
    
    if (convertedHour >= 10) {
        convertedHour = `${convertedHour}`
    }
    
    else {
        convertedHour = `0${convertedHour}`
    }
    
    if (minute === "00"){
        if (convertedHour === '12'){
            return `noon`
        }
        else if (convertedHour === '00'){
            return `midnight`
        }
        else{
            return `${hours[convertedHour]} o'clock ${amOrPm}`
        }
    }

    hoursinWords = hours[convertedHour]
    if (parseInt(minute) < 10){
        minutesinWords = `oh ${minutes[minute]}`;
    }
    else {
        minutesinWords = minutes[minute];
    }
    
    return `${hoursinWords} ${minutesinWords} ${amOrPm}`;
}

ones.forEach((num, idx)=>{
    const numerical = `0${idx + 1}`;
    minutes[numerical] = num;
})

tenToTwenty.forEach((num, idx)=>{
    const numerical = `1${idx}`;
    minutes[numerical] = num;
})

tenths.forEach((num, idx)=>{
    const numerical = `${idx + 2}0`;
    minutes[numerical] = num;
    addOnes(idx + 2, num, minutes)
})

module.exports = timeWord