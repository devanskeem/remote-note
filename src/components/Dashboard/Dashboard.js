import React, { Component } from 'react'
import './Dashboard.css'
import Note from '../Note/Note'
import Reminder from '../Reminder/Reminder'
import Todo from '../Todo/Todo'
export class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             components: ['todo', 'note', 'todo', 'reminder', 'reminder','reminder', 'todo']
        }
    }
    //this function take in a column parameter between 1 and 3 and returns the jsx for that column
    getColumn(col){
        const {components} = this.state
        let column = components.map((element, index) => {
            if (index % 3 === (col - 1)){ //i used (column - 1) here because i am going by index not column
                if (element === 'note') return <Note/>
                else if (element === 'reminder') return <Reminder/>
                else if (element === 'todo') return <Todo/>
            }
        })
        return column;
    }
    render() {
        return (
            <div className='Dashboard'>
                <section className="dashboard-content">
                    <section className="column">
                        {this.getColumn(1)}
                    </section>
                    <section className="column">
                        {this.getColumn(2)}
                    </section>
                    <section className="column">
                        {this.getColumn(3)} 
                    </section>
                </section>
            </div>
        )
    }
}

export default Dashboard
