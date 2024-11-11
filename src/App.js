import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  // const [isHeld, setIsHeld] = React.useState(false)
  const [tenzies, settenzies] = React.useState(false)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      settenzies(true)
      console.log("You Won ")
    }
  }, [dice])
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(
        generateNewDie()
      )
    }
    return newDice
  }
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  function rollDice() {
    if (!tenzies) {
      setDice(oldDice =>
        oldDice.map(die =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      settenzies(false);
      setDice(allNewDice());
    }
  }

  function toggleHeld(id) {
    setDice(prevDice => prevDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  const diceElements = dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleHeld={() => toggleHeld(die.id)}
    />
  )

  return (
    <main className="dice--container">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      {diceElements}
      <button onClick={rollDice} className="roll--button" won={tenzies}>{tenzies ? "New Game" : "roll"}</button>
    </main>
  )
}

