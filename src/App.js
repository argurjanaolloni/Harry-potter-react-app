import { useEffect, useState } from 'react'
import Nav from './Nav.jsx';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([])
  const [character, setCharacter] = useState({})
  let [modalToggle, setModalToggle] = useState(false)

  useEffect(() => {
    apiCall()
  }, [])

  function apiCall() {
    fetch('https://hp-api.onrender.com/api/characters/')
    
    .then((res) => res.json())
    .then((data) => setCharacters(data))
  }
  


  function display() {
    setModalToggle(prev => !prev)
  }

  function handleClick(charInfo) {
    setCharacter(charInfo)
    display()
  }

  // const characterModal = [...characters].slice(0, 25)
  // console.log(characters)

  return (
    <div className="App">
      <Nav />
      <div className="characters-list">
        
        {characters.slice(0, 25).map((character, index) => (
          <div className="character-container" onClick={() => handleClick(character)} key={index}>
            <img className= "image" src={character.image} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      {modalToggle ?
        <div className="modal">
          <div className="modal-content">
            <div className="info">
              <h1>{character.name}</h1>
              <p>Species: {character.species}</p>
              <p>Ancestry: {character.ancestry}</p>
              <p>Gender: {character.gender}</p>
              <p>Wand: {character.wand.wood}</p>
              <p>Core: {character.wand.core}</p>
              <p>Patronus: {character.patronus}</p>
              <button onClick={display}>x</button>
              </div>
        </div>
          </div>
        
        :
        null
      }
    </div>
  );
}

export default App;
