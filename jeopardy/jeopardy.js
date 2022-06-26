// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds(selectedCategories) {
    const categoryIds = selectedCategories.map( category => {
        return category.id
    })
    return categoryIds
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const res = await axios.get('http://jservice.io/api/category' , {params : {id : catId}})
    const clues = res.data.clues.map(clue =>{
        return {
            question : clue.question,
            answer : clue.answer,
            showing : null
        }
    })
    const category = {
        title : res.data.title,
        clues
    }
    return category;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    //create the headers
    let $jeopardyTbl = $('#jeopardy')
    const $thead = $(`<thead></thead>`)
    for (let i = 0; i < categories.length; i++){
        const $td = $(`<td>${categories[i].title}</td>`)
        $thead.append($td)
        }
    $jeopardyTbl.append($thead);
    for (let i = 0; i < 5; i++){
        const $tr = $('<tr></tr>')
        for(let j = 0; j < 6; j++){
            //adding data-category and data-clue to be accessed later
            const $td = $(`<td class='question' data-category="${j}" data-clue="${i}"></td>`)
            //initializing that the board will only contain question marks first
            $td.html(`?`);
            $tr.append($td);
        }
        $jeopardyTbl.append($tr);
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    if(evt.target.tagName === 'TD' && evt.target.classList.contains('question')){
        const category = evt.target.dataset.category;
        const clue = evt.target.dataset.clue;
        if(categories[category].clues[clue].showing == null){
            evt.target.innerText = categories[category].clues[clue].question
            categories[category].clues[clue].showing = 'question'
        }
        else{
            const getAnswer = categories[category].clues[clue].answer;
            const first = getAnswer[0] + getAnswer[1] + getAnswer[2]
            if (first === '<i>'){
                let newInnerText = ""
                for (let i = 3; i < getAnswer.length - 4; i++){
                    newInnerText += getAnswer[i]
                }
                evt.target.innerText = newInnerText
                categories[category].clues[clue].showing = 'answer'
            }
            else{
                evt.target.innerHTML = (categories[category].clues[clue].answer);
                evt.target.style.backgroundColor = '#28a200'
                categories[category].clues[clue].showing = 'answer'
            }
            categories[category].clues[clue].showing = 'answer'
        }
        console.log(categories[category].clues[clue].showing)
    }
    console.log(checkAllAnswersRevealed())
}

function checkAllAnswersRevealed(){
    for (let i = 0; i < categories.length; i++){
        let category = categories[i]
        let clues = category.clues
        let isTrue = clues.every(clue =>{
            return clue.showing === 'answer'
        })
        if (isTrue === false){
            return false
        }
    }
    return true
}
/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    //will show loading class on the html
    //loading css from https://www.w3schools.com/howto/howto_css_loader.asp
    const $loader = $('#loader')
    const $btnNewGame = $('#new-game')
    $btnNewGame.html('Loading...');
    $loader.show()
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    const $loader = $('#loader')
    const $btnNewGame = $('#new-game')
    $btnNewGame.html('New Game');
    $loader.hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    showLoadingView()
    let $jeopardyTbl = $('#jeopardy')
    $jeopardyTbl.html("")
    categories = [];
    //generated a random offset between 1 to 1000 to offset the ids of the categories being gathered by the api
    //count 100 is the maximum amount of categories that the api can gather per GET
    const offset = randomNumberGenerator(1000);
    const res = await axios.get('http://jservice.io/api/categories', {params : {
        count : 100,
        offset
    }})
    //process of selecting random categories from the response
    //response will only contain 100 categories
    const selectedCategories = []
    while (selectedCategories.length != 6){
        //randomNumberGenerator is used to get a random category from the response
        const rng = randomNumberGenerator(100);
        //checking if category has already been selected before
        if(res.data[rng] != undefined && !selectedCategories.includes(res.data[rng])){
            selectedCategories.push(res.data[rng]);
        }
    }
    //getting the category ids of the selected categories
    const categoryIds = getCategoryIds(selectedCategories);
    //mapping the category Ids to its respected category along with the clues per category
    categories = await categoryIds.map(async (id)=>{
        return await getCategory(id)
    })
    //so that categories will be gathered first before fill table is executed
    categories = await Promise.all(categories);
    hideLoadingView();
    fillTable()
}

function randomNumberGenerator(max){
    const rng = Math.round(Math.random() * max)
    return rng
}

const $btnNewGame = $('#new-game')
$btnNewGame.on('click', function(e){
    e.preventDefault;
    setupAndStart();
})

const $tblJeopardy = $('#jeopardy')
$tblJeopardy.on('click', handleClick)
/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO