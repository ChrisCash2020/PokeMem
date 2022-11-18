import { useState, useEffect } from 'react'
import Main from './components/Main'
import Nav from './components/Nav'
import Item from './components/Item'

function App() {
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(JSON.parse(localStorage.getItem("best")) || 0)
  const [monsterObj, setMonsterObj] = useState({ wholeArray: [], seenArray: [] })
  useEffect(() => {
    localStorage.setItem("best", JSON.stringify(best))
  }, [best])

  useEffect(() => {
    async function getPokemon(i) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      const data = await res.json()
      setMonsterObj(monsterObj => {
        return {
          ...monsterObj, wholeArray:
            [...monsterObj.wholeArray,
            { id: data.id, name: data.name, image: data.sprites.front_default }
            ]
        }
      })
    }
    for (let i = 1; i < 21; i++) {
      getPokemon(i)
    }
    setLoading(false)
  }, [])

  function handleSeen(e, setMonsterCardArr) {
    e.preventDefault()
    const id = e.target.id
    if (monsterObj.seenArray.includes(id)) {
      console.log('game over')
      if (best < score) setBest(score)
      setGameOver(true)
    }
    setScore(score => score += 1)
    setMonsterObj(monsterObj => ({ ...monsterObj, seenArray: [...monsterObj.seenArray, id] }))
    setMonsterCardArr(shuffledMonsters())
  }
  function shuffledMonsters() {
    return monsterObj.wholeArray.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, 5);
  }

  return (
    <>
      {(monsterObj.wholeArray.length != 20) ? (
        <div className="loader-container">
          <h1>Loading</h1>
          <div className="spinner"></div>
        </div>
      ) :
        gameOver == false ?
          ([<Nav key="1" score={score} best={best} />, <Main key="2" shuffledMonsters={shuffledMonsters} handleSeen={handleSeen} score={score} monsterObj={monsterObj} />])
          :
          <div className="loader-container game-over">
            <h1>Game Over</h1>
            <h2>Congratulations your High Score is {best}</h2>
            <button onClick={() => window.location.reload(false)}>New Game</button>
          </div>
      }
    </>
  )

}

export default App
