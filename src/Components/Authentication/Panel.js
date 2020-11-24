import './style.css';

function Panel(props) {
    //Get the child and put them in the right panel. Left panel will be used for 
    //Create a grid which contains a left panel and right panel
    return (
        <div className="authentication-panel columns">
            <div className="column" id="authentication-left-panel">
                <div>
                    <h1>
                        Learn vocabulary and pronounciations    
                    </h1>
                    <h1>
                        Discover new words and meanings
                    </h1>
                    <h1>
                        Explore flashcards from all around the world
                    </h1>
                </div>
            </div>
            <div className="column" id="authentication-right-panel">
            {
                props.children
            }
            </div>
        </div>
    )
}

export default Panel;