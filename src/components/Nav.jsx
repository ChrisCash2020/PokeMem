export default function Nav(props) {
    return (
        <nav className="nav">
            <div className="logo-wrapper">
                <img className="logo" alt="logo" />
                <h1>PokeMemory</h1>
            </div>
            <h1>Score {props.score || '0'} | Best {props.best || '0'}</h1>
        </nav>
    )
}