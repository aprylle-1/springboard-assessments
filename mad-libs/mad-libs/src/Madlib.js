import NewMadlibForm from "./NewMadlibForm";
import Story from "./Story";
import { useState } from "react";

/**
 * Contains Madlib Form and Story components
 * 
 * Story component will only show if story is not null
 * 
 *  createStory is a function set to Child Component <NewMadlibForm/> to use
 *  as a way to set state for story
 * 
 */
function Madlib () {
    const [story, setStory] = useState(null)

    const createStory = (storyData) => {
        setStory(storyData)
    }
    return (
        <div className="Madlib">
            <h1>Madlibs!</h1>
            <NewMadlibForm createStory={createStory}/>
            {story && <Story words={story}/>}
        </div>
    );
}

export default Madlib;