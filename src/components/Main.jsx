import { useState } from "react";
import Item from "./Item"
export default function Main(props) {

    const [monsterCardArr, setMonsterCardArr] = useState(props.shuffledMonsters())

    const monsterCards = monsterCardArr.map(mon => <Item handleSeen={props.handleSeen} setMonsterCardArr={setMonsterCardArr} id={mon.id} key={mon.id} image={mon.image} name={mon.name} />)
    return (
        <div className="main">
            <h1>Choose your next Pokemon Lvl {props.score + 1}</h1>
            <div className="game-board">
                {monsterCards}
            </div>
        </div>
    )
}