import React from 'react';
import ToDoList from './ToDoList';
import Navbar from './navbar';
const ToDoAPIURL = "/api/todo";


export default class ToDoApp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newTaskInput: ""
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitTask = this.submitTask.bind(this);
        this.toDOListRef = React.createRef();
    }

    inputChangeHandler(e) {
        this.setState({newTaskInput: e.target.value})
    }

    submitTask(e) {
        if(e.key === "Enter") {
            let currentState = this.state;
            if(currentState.newTaskInput) {
                let data = { name: currentState.newTaskInput, "completed" : false }
                fetch(ToDoAPIURL, {
                    method: "POST",
                    headers:{ 'Content-Type': 'application/json' } ,
                    body: JSON.stringify(data)
                })
                .then(data => data.json)
                .then((task) => {
                    this.toDOListRef.current.refreshList();
                    this.setState({ newTaskInput: "" });
                });
                
            }

        }
    }

    render() {
        return (
            <>
                <Navbar/>
                <div className="App">
                    
                    <header> <h2>To Do App Using MERN Stack</h2> </header>
                    <input type="text" id="new-task-input" placeholder="Enter your Task" value={this.state.newTaskInput} onChange={this.inputChangeHandler} onKeyPress={this.submitTask}/>
                    <ToDoList ref={this.toDOListRef}/>
                </div>
            </>
        )
    }
}