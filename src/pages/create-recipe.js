import {useState} from 'react';
import axios from 'axios';
import { useGetUserID } from '../hoooks/useGetUserID';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';



export const CreateRecipe = ()=>{
    const userID = useGetUserID();
    const [cookies,_]= useCookies(["access_token"]);
    const [recipe,setRecipe]= useState({
        name:"",
        ingredients: [],
        instructions:"",
        imageURL:"",
        cookingTime:0,
        userOwner:userID
    });

    const navigate =  useNavigate();

    const handleChange = (event)=>{
        const {name , value} =event.target;
        setRecipe({...recipe,[name]:value});
    }
    const handleIngredientChange = (event,idx)=>{
        const { value} =event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe,ingredients});
        
    }
    const addIngredient =(event)=>{
        // event.preventDefault();
        setRecipe({...recipe,ingredients: [...recipe.ingredients, ""]})
    }
    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
           const response= await axios.post("https://recipe-project-1.onrender.com/recipes/create",recipe,
               { headers:{authorization : cookies.access_token}}
            );
            alert(response.data.msg)
            navigate('/')
        } catch (err) {

            console.log(err);
        }
    }
    return(
        <div className="auth savedRecipe-container"> 
            <h2>Create Recipe</h2>
            <form className='savedRecipe-container' onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text"name='name' id="name" onChange={handleChange} />
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    <input
                     key={idx} 
                     id='ingredients'
                     type='text' 
                     name='ingredients' 
                     value={ingredient} 
                     onChange={(event) => handleIngredientChange(event, idx)} />
                ))}
                <button className="add-button"onClick={addIngredient} type='button'>+ Add Ingredients</button>
                <label htmlFor="instructions">Instructions</label>
                <textarea type="text"name='instructions' id="instructions"  onChange={handleChange}/>
                <label htmlFor="imageURL">Image URL</label>
                <input type="text" name='imageURL' id="imageURL"  onChange={handleChange}/>
                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="text" name='cookingTime' id="cookingTime" onChange={handleChange} />
                <button type='submit'  >Create Recipe</button>

            </form>
        </div>
    )
}
