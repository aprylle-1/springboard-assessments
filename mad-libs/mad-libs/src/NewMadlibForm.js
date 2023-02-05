import { useState } from "react"
import './NewMadlibForm.css'

/**
 * <---- Component NewMadlibForm -----> 
 * 
 * NewMadlibForm contains the form used to get
 * prompts from the user
 * 
 *  createStory is passed as a property
 * 
 *  NewMadlibForm inputs is controlled by formData Property
 * 
 *  formData is an object that contains the prompts needed to fill the story
 * 
 *  formData looks like this
 *  {
 *      name : "sample",
 *      partOfBody : "sample",
 *      typeOfFluid : "sample",
 *      substance : "sample"
 *  }
 * 
 *  handleFormChange is a function that sets formData 
 *  based on the input that is being changed
 * 
 *  clear is a function that sets formData to null
 *  this also sets story in the Madlib component to null which causes <Story/> to not be rendered
 * 
 *  addStory is used to set the onClick function of Create Story button
 *  it runs the createStory function, passing on formData
 * 
 */
function NewMadlibForm ({createStory}) {
    const initialState = {
        name : "",
        partOfBody : "",
        typeOfFluid : "",
        substance : ""
    }
    const [formData, setFormData] = useState(initialState)

    const handleFormChange = (e) => {
        const {name,value} = e.target;
        setFormData((formData)=>{
            return({
                ...formData,
                [name] : value
            })
        })
    }

    const clear = (e) => {
        e.preventDefault()
        setFormData(initialState)
        createStory(null)
    }

    const addStory = (e) => {
        e.preventDefault()
        createStory(formData)
    }

    return (
        <form onSubmit={addStory} className="NewMadlibForm">
            <input
            type="text"
            name = "name"
            placeholder="name"
            id = "name"
            className="NewMadlibForm-input"
            value = {formData.name}
            onChange = {handleFormChange}
            required
            />

            <input
            type="text"
            name = "partOfBody"
            placeholder="part of body"
            id = "partOfBody"
            className="NewMadlibForm-input"
            value = {formData.partOfBody}
            onChange = {handleFormChange}
            required
            />

            
            <input
            type="text"
            name = "typeOfFluid"
            placeholder="type of fluid"
            id = "typeOfFluid"
            className="NewMadlibForm-input"
            value = {formData.typeOfFluid}
            onChange = {handleFormChange}
            required
            />

            <input
            type="text"
            name = "substance"
            placeholder="substance"
            id = "substance"
            className="NewMadlibForm-input"
            value = {formData.substance}
            onChange = {handleFormChange}
            required
            />

            <div>
                <button className="NewMadlibForm-btn">Create Story</button>
                <button onClick={clear} className="NewMadlibForm-btn">Clear</button>
            </div>
        </form>
    )
}

export default NewMadlibForm