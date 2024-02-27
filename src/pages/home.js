import  axios from "axios";
import {useEffect, useState} from "react";
import './home.css'
import { useGetUserID } from "../hoooks/useGetUserID";

export const Home = () => {
    const [recipes ,setRecipes]= useState([]);
    const [savedRecipes ,setSavedRecipes]= useState([]);
    const userID = useGetUserID();

    useEffect(()=>{
      const fetchRecipe = async () =>{
        try {
          const response = await axios.get("http://localhost:3001/recipes");
          setRecipes(response.data);
          // console.log(response.data);
        } catch (err) {
          console.error(err);
        }
      } 
      const fetchSavedRecipe = async () =>{
        try {
          const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
          setSavedRecipes(response.data.savedRecipes);
          console.log(response);
        } catch (err) {
          console.error(err);
        }
      } 

      fetchRecipe();
      fetchSavedRecipe();
    },[])
    
    const saveRecipe=async(recipeID)=>{
      try {
        const response = await axios.put('http://localhost:3001/recipes',{
          recipeID,userID
        });
    setSavedRecipes(response.data.saveRecipe)       
        // console.log(response)
      } catch (err) {
        console.error(err);
      }
    }
  //  const  isRecipeSaved = (id) => savedRecipes.includes(id);

  //  const check = ()=>{
  //   recipes.map((Rec)=>{
  //     console.log(Rec._id);
  //    console.log(savedRecipes.includes(Rec._id));
      
  //   })
  //  } 
  //  console.log(check());

   console.log(savedRecipes);
    console.log(recipes);
  return (
    <div>
      <h2 className="heading">Recipes</h2>
      <ul >
        {recipes.map((recipe)=>(
         
          <li key={recipe._id}className="recipe-container">
            {/* {savedRecipes.includes(recipe._id) && <h1>already saved</h1>} */}
            <div>
              <h2 className="recipe-heading">{recipe.name}</h2>
                {savedRecipes.includes(recipe._id)?
                <button disabled>saved</button>:
                <button onClick={()=>saveRecipe(recipe._id)}>save</button>}
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
