import './App.scss';

import { FaSearch } from 'react-icons/fa'
import { useRef, useState } from 'react';
import Pokemon from './Pokemon';
import image from './404.webp'

function App() {
  const [clear, setClear] = useState(true)
  
  const [loading, setLoading] = useState(false)

  let [error, setError] = useState(false)

  const inputRef = useRef();

  const [pokemon, setPokemon] = useState({})


  const handleSearch = async () => {
    setClear(false);
    setLoading(true)

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputRef.current.value.toLowerCase()}`, {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        }
      })

      const data = await res.json();
      setPokemon(data);
      setLoading(false)
      setError(false);
    }
    catch (exception) {
      console.log(exception);
      setError(!error);
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className = "App">
        <div className = "Search_bar">
          <div className = "Search_icon"><FaSearch/></div>
          <input type = "text" ref= {inputRef}></input>
          <span className = "search_button" onClick={handleSearch}> Search </span>
        </div>

        <div className = {(clear) ? "Searched_pokemon" : "Searched_pokemon active"}>
            {clear ? (
              <></>
            ) : (
              <>
                {loading ? (
                  <div style = {{display : "flex", alignItems : "center", flexDirection : "column" ,color : "white"}}>
                    <div className = "loader"></div>
                    Loading ...<div></div>
                  </div>
                ) : (
                  <>
                  {(error == true) ? (
                    <div style = {{display : "flex", alignItems : "center", flexDirection : "column" ,color : "white"}}>
                      <img src = {image}></img>
                      No Result Found
                    </div>
                  ) : (
                    <Pokemon pokemon = {pokemon}/>
                  )}
                  </>
                )}
              </>
            )}
        </div>

    </div>
  );
}

export default App;