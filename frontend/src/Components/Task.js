import React from 'react';

export default class Task extends React.Component {
    render() {
        const props = this.props;
        return (
            <>
                <li 
                    key={props.taskId} 
                    className={props.completed ? "task-completed" : ""} 
                    onClick={ () => props.toggletaskCompletion(props.taskId)}>
                        {props.name}
                        <span onClick={ (e) => { e.stopPropagation(); props.deleteTask(props.taskId) } }>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </span>
                </li>
            </>
        )
    }
}