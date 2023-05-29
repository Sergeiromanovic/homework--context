import React, { useState } from "react";
import TaskInput from "../TaskInput";
import TaskCard from "../TaskCard";

import "./index.css";

export const TASK_STATUSES = {
    todo: "todo",
    inProgress: "inProgress",
    done: "done"
};

/**
 * @typedef TaskTableProps
 */

/**
 * @param {TaskTableProps} props 
 * @returns 
 */
const TaskTable = (props) => {
    const [taskList, setTaskList] = useState([]);

    const handleAddTask = (text) => {
        setTaskList((prevState) => [
            ...prevState,
            {
                id: Date.now(),
                text,
                status: TASK_STATUSES.todo
            }
        ]);
    };

    const handleDeleteTask = (id) => {
        setTaskList((prevState) => prevState.filter((item) => item.id !== id));
    };

    const handleTaskStatusChange = (id, newStatus) => {
        setTaskList((prevState) => prevState.map((item) => {
            if (item.id !== id) {
                return item;
            } else {
                item.status = newStatus;
                return item;
            }
        }));
    };

    const todoTaskList = taskList.filter((item) => item.status === TASK_STATUSES.todo);
    const inProgressTaskList = taskList.filter((item) => item.status === TASK_STATUSES.inProgress);
    const doneTaskList = taskList.filter((item) => item.status === TASK_STATUSES.done);

    return (
        <div>
            <TaskInput onAdd={handleAddTask} />
            <div className="task-table">
                <div className="task-table__column">
                    <h5 className="task-table__column-header">Todo</h5>
                    <div className="task-table__column-items">
                        {todoTaskList.map((item) => (
                            <TaskCard
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                status={item.status}
                                onDelete={handleDeleteTask}
                                onStatusChange={handleTaskStatusChange}
                            />
                        ))}
                    </div>
                </div>
                <div className="task-table__column">
                    <h5 className="task-table__column-header">In Progress</h5>
                    <div className="task-table__column-items">
                        {inProgressTaskList.map((item) => (
                            <TaskCard
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                status={item.status}
                                onDelete={handleDeleteTask}
                                onStatusChange={handleTaskStatusChange}
                            />
                        ))}
                    </div>
                </div>
                <div className="task-table__column">
                    <h5 className="task-table__column-header">Done</h5>
                    <div className="task-table__column-items">
                        {doneTaskList.map((item) => (
                            <TaskCard
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                status={item.status}
                                onDelete={handleDeleteTask}
                                onStatusChange={handleTaskStatusChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTable;