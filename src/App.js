// import logo from './logo.svg';
import './App.css';

function App() {
  async  function  fetchApi (){
  const view = document.querySelector('#view');
       fetch('http://localhost:3001/auth/login')
             .then(response=>response.json())
            .then(json=>{
              
              if(view.innerHTML==""){
                for (const key in json) {
                if (json.hasOwnProperty.call(json, key)) {
                  // const element = json[key];
                  view.innerHTML += `<li>${key} : ${json[key]}</li>`;
                  
                }
              }
              }
              console.log(json);
            })
            .catch(err=>{
              console.error(err);
            })
  }
  return (
    <div className="App">
      <button onClick={fetchApi}>fetch Api</button>
      <div id="view"></div>
    </div>
  );
}

export default App;
