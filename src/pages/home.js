import  axios from "axios";
import {useEffect, useState} from "react";
import './home.css'
import { useGetUserID } from "../hoooks/useGetUserID";

export const Home = () => {
    const [recipes ,setRecipes]= useState([]);
    const [savedRecipes ,setSavedRecipes]= useState([
    ]);
    const userID = useGetUserID();

    useEffect(()=>{
      const fetchRecipe = async () =>{
        try {
          const response = await axios.get("https://recipe-project-1.onrender.com/recipes");
          setRecipes(response.data);
        } catch (err) {
          console.error(err);
        }
      } 
      if(userID){
        const fetchSavedRecipe = async () =>{
        try {
          const response = await axios.get(
            `https://recipe-project-1.onrender.com/recipes/savedRecipes/ids/${userID}`);
            setSavedRecipes(response.data.savedRecipes);
            // console.log(savedRecipes);
        } catch (err) {
          console.error(err);
        }
      } 

      fetchSavedRecipe();
      }
      

      fetchRecipe();
    },[userID])
    
    const saveRecipe=async(recipeID)=>{
      try {
        const response = await axios.put('https://recipe-project-1.onrender.com/recipes',{
          recipeID,userID
        });
        if (savedRecipes=='null') {
          setSavedRecipes(response._id)
        }
         setSavedRecipes(response.data.savedRecipes)       
        // console.log("savedrecipe",response)
      } catch (err) {
        console.error(err);
      }
    }

    const isUserloggedIn =(recipe)=>{
      if(userID){
        return <>
          {savedRecipes.includes(recipe._id)?
                <button disabled>saved</button>:
                <button onClick={()=>saveRecipe(recipe._id)}>save</button>}
        </>
      }
      else{
        return <></>
      }
    }
  

   console.log(savedRecipes);
    // console.log(recipes);
  return (
    <div>
      <h2 className="heading">Recipes</h2>
      <ul >
        {recipes.map((recipe)=>(
         
          <li key={recipe._id}className="recipe-container">
            {/* {savedRecipes.includes(recipe._id) && <h1>already saved</h1>} */}
            <div>
              <h2 className="recipe-heading">{recipe.name}</h2>
              {
                isUserloggedIn(recipe)
              }
                {/* {savedRecipes.includes(recipe._id)?
                <button disabled>saved</button>:
                <button onClick={()=>saveRecipe(recipe._id)}>save</button>} */}
                {/* <button onClick={()=>saveRecipe(recipe._id)}
                 disabled={isRecipeSaved(recipe._id)}
                 >{isRecipeSaved(recipe._id)?'saved':'save'}</button> */}
          
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name} className="recipe-img"/>
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
