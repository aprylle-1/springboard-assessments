import "./Story.css"
/**
 * Story gets the prop words which looks like this
 *  words = 
 *  {
 *      name : "sample",
 *      partOfBody : "sample",
 *      typeOfFluid : "sample",
 *      substance : "sample"
 *  } 
 */
function Story({words}){
    return (
        <div className="Story">
            <u>{words.name}</u> is sick with the <u>{words.partOfBody}</u> flu.
            <br/>
            Drink more <u>{words.typeOfFluid}</u> and take <u>{words.substance}</u> as needed.
        </div>
    )
}

export default Story;