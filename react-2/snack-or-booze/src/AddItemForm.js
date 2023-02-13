import React from "react";
import slugify from "slugify";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useState } from "react";
import './AddItemForm.css'

/**
 * Contains component that will render the Add Item Form 
 * Used to add items to the drinks and snacks lists
 */

function AddItemForm({addItem, list, items}) {
    /**
     * Form's initial state -- use to control the values of the inputs
     */
    const initialState = {
        id : "",
        name : "",
        description : "",
        recipe : "",
        serve : ""
    }
    
    const [formData, setFormData] = useState(initialState)
    /**
     * Function that handles changes in the input
     * Used to update formData
     */
    const handleChange = (e) => {
        const {name, value} = e.target
        let id = ""
        if (name === "name"){
            id = slugify(value).toLowerCase()
            setFormData(data=>{
                return {
                    ...data,
                    [name] : value,
                    id : id
                }
            })
        }
        else{
            setFormData(data=>{
                return {
                    ...data,
                    [name] : value,
                }
            })
        }
    }

    /**
     * Function that uses props.addItem function
     * props.list will be passed to the addItem function as the list AND
     * formData is passed as the item
     */
    async function addNewItem(e){
        e.preventDefault()
        const id = formData.id
        let item = items.find(item => item.id === id);
        if(item){
            alert("Item already in the menu")
            setFormData(initialState)
        }
        else {
            await (addItem(list, formData))
            setFormData(initialState)
        }
    }
    return (
        <Card className="AddItemForm">
            <CardBody>
                <form onSubmit={addNewItem}>
                    <CardTitle>Add item to {list} menu</CardTitle>
                    <div className="AddItemForm-form-item">
                    <div>
                    <label htmlFor="item-name">Name</label>
                    </div>
                    <div>
                    <input
                     required
                     onChange={handleChange}
                     type="text"
                     id="item-name"
                     name="name"
                     value={formData.name}
                    />
                    </div>
                    </div>
                    <div className="AddItemForm-form-item">
                    <div>
                    <label htmlFor="item-name">Description</label>
                    </div>
                    <div>
                    <input
                     required
                     onChange={handleChange}
                     type="text"
                     id="item-description"
                     name="description"
                     value={formData.description}
                    />
                    </div>
                    </div>
                    <div className="AddItemForm-form-item">
                    <div>
                    <label htmlFor="item-name">Recipe</label>
                    </div>
                    <div>
                    <textarea
                     rows="5"
                     cols="30"
                     required
                     onChange={handleChange}
                     type="text"
                     id="item-recipe"
                     name="recipe"
                     value={formData.recipe}
                    />
                    </div>
                    </div>
                    <div className="AddItemForm-form-item">
                    <div>
                    <label htmlFor="item-name">Serve</label>
                    </div>
                    <textarea
                     rows="3"
                     cols="30"
                     required
                     onChange={handleChange}
                     type="text"
                     id="item-serve"
                     name="serve"
                     value={formData.serve}
                    />
                    </div>
                    <button>Add</button>
                </form>
            </CardBody>
        </Card>
    )
}

export default AddItemForm;