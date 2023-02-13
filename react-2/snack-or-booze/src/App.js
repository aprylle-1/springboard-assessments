import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import AddItemForm from "./AddItemForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([])
  
 /**
  * Gets list of snacks and drinks from DB onload
  * Will be used to display menu items
  */
  useEffect(() => {
    async function getSnacks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
    }
    
    async function getDrinks() {
      let drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
    }
    
    getSnacks();
    
    getDrinks();
    
    setIsLoading(false);
  }, []);

  /* Display Loading while data from API is being fetched*/
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  /**
   * Function to add item to database
   * param (list) --> either snacks/drinks, this will determine which list item is going to be added to
   * param (item) --> object containing the ff: {id, name, description, recipe, serve}
   */
  async function addItem (list, item){
    try{
      if (list === "snacks"){
        let snack = await SnackOrBoozeApi.addSnacks(item)
        setSnacks(snacks => [...snacks, snack])
      }
      else if (list === "drinks"){
        let drink = await SnackOrBoozeApi.addDrinks(item)
        setDrinks(drinks => [...drinks, drink])
      }
    }
    catch(e){
      console.log(e.message)
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} />
            </Route>
            <Route exact path="/snacks/add">
              <AddItemForm items={snacks} list="snacks" addItem={addItem}/>
            </Route>
            <Route exact path="/snacks/:id">
              <MenuItem items={snacks} cantFind="/snacks" />
            </Route>
            <Route exact path="/snacks">
              <Menu list="snacks" items={snacks} title="Snacks" />
            </Route>
            <Route exact path="/drinks/add">
              <AddItemForm items={drinks} list="drinks" addItem={addItem}/>
            </Route>
            <Route exact path="/drinks/:id">
              <MenuItem items={drinks} cantFind="/drinks" />
            </Route>
            <Route exact path="/drinks">
              <Menu list="drinks" items={drinks} title="Drinks"/>
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
