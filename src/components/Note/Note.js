import React, { Component } from 'react'
import './Note.css'
export class Note extends Component {
    render() {
        return (
            <div className='Note'>
                <header className='card-header'>
                    <h1>This is a note</h1>
                </header>
                <div className="contents">
                    <h3>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nemo dolor inventore aspernatur autem repellat facere ab ad odio qui voluptas maxime dolore fuga, modi laudantium? Sequi mollitia quos commodi.
                    </h3>
                </div>
            </div>
        )
    }
}

export default Note
