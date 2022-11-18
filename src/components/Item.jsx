export default function Item(props) {
    return (
        <div className="item" onClick={(e) => props.handleSeen(e, props.setMonsterCardArr)} id={props.id}>
            <img id={props.id} alt="monster" src={props.image || ''} />
            <div id={props.id} className="hr"></div>
            <h2 id={props.id}>{props.name || 1}</h2>
        </div>
    )
}