import { useState } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const  Auth = ()=>{
    return(
        <div className="auth">
            <Login/>
            <Register/>
        </div>
    )
}

const Login =()=>{
    const [username,setUsername] =useState("")
    const [password,setPassword] =useState("");
    const [_,setCookies]=useCookies("access_token")
    const navigate = useNavigate();

    const onSubmit  = async(event)=>{
        event.preventDefault(); //  taki jab submit button click ho to page reload na ho
        try{
            const response=await axios.post('http://localhost:3001/auth/login',{
                username,password
            });
            alert(response.data.message)
            setCookies("access_token",response.data.token)
            window.localStorage.setItem("userID",response.data.userID);
            window.localStorage.setItem("name",response.data.name);
            if(response.data.loggedStatus){

                navigate("/")
            }
        }catch(err){

        }
    }

    return (
        <Form 
         username={username}
         setUsername={setUsername}
         password={password}
         setPassword={setPassword}
         label="Login"
         onSubmit={onSubmit}
        />
    )
}
const Register =()=>{
    const [username,setUsername] =useState("")
    const [password,setPassword] =useState("");

    const onSubmit =async (event)=>{
        event.preventDefault();//  taki jab submit button click ho to page reload na ho
        try{
            const response= await axios.post('http://localhost:3001/auth/register',{
                username,password
            });

            alert(response.data.message)
            // console.log(response);
        }catch(err){
            console.error(err)
        }
    }

    return(
        <Form 
         username={username}
         setUsername={setUsername}
         password={password}
         setPassword={setPassword}
         label="Register"
         onSubmit={onSubmit}
        />
    )
}


const Form =({username,setUsername,password,setPassword,label,onSubmit})=>{
    return(
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={(event)=>{setUsername(event.target.value)}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">password:</label>
                    <input type="password" id="password" onChange={(event)=>{setPassword(event.target.value)}}/>
                </div>
                <button type="submit">{label}</button>
            </form>

        </div>
    )
}