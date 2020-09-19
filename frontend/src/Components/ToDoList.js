import React from 'react';
import Task from './Task';
const ToDoAPIURL = "/api/todo/";

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loadingComplete: false
        };
        this.toggletaskCompletion = this.toggletaskCompletion.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }

    refreshList() {
        fetch(ToDoAPIURL)
        .then(data => data.json())
        .then(tasks => {
            this.setState(  { tasks: tasks, loadingComplete: true } )
        })
    }

    componentDidMount() {
        this.refreshList();
    }
    
    toggletaskCompletion(id) {
        if(id !== undefined) {
            let task = this.state.tasks[id];
            let data = { "completed" : !task.completed }
            fetch(ToDoAPIURL+task._id, {
                method: "PUT",
                headers:{ 'Content-Type': 'application/json' } ,
                body: JSON.stringify(data)
            })
            .then((resp) => {
                if(!resp.ok) {
                    return ;
                }
                return resp.json
            })
            .then((task) => {
                this.refreshList();
            });
        }
    }

    deleteTask(id) {
        if(id !== undefined) {
            let task = this.state.tasks[id];
            fetch("/api/todo/"+task._id, {
                method: "DELETE",
                headers:{ 'Content-Type': 'application/json' }
            })
            .then(data => data.json)
            .then((task) => {
                this.refreshList();
            });
        }

    }

    render() {

        if(!this.state.loadingComplete) {
            return (
                <div className="list-task" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    Loading Please Wait...<br/><br/>
                    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                </div>
            )
        }
        const listElement = this.state.tasks.map( (task, index) => {
            return <Task 
                        key={task._id}
                        taskId={index}
                        name={task.name}
                        completed={task.completed}
                        toggletaskCompletion={(id) => this.toggletaskCompletion(id) } deleteTask={(id) => this.deleteTask(id)}/>
        })
        return (
            <div className="list-task">
                <ul>
                    {listElement}
                </ul>
            </div>
        )
    }

}