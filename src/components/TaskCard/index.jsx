import React, { useContext } from "react";
import { TASK_STATUSES } from "../TaskTable";
import { ThemeContext, THEMES } from "../../App";

import "./index.css";

/**
 * @typedef TaskCardProps
 * @property {number} id
 * @property {string} text Text of the card
 * @property {string} status
 * @property {(id: number) => void} onDelete
 * @property {(id: number, newStatus: string) => void} onStatusChange
 */

/**
 * Card for task
 * @param {TaskCardProps} props Props of the component
 * @returns {JSX}
 */
const TaskCard = (props) => {
    const theme = useContext(ThemeContext);

    const handleStatusChange = (event) => {
        console.log({
            newStatus: event.target.value
        });

        props.onStatusChange(props.id, event.target.value);
    };

    const deleteButton = props.status === TASK_STATUSES.done && (
        <button
            className="task-card__delete-button"
            onClick={() => props.onDelete(props.id)}
        >
            x
        </button>
    );

    let taskCardClasses = "task-card";
    if (theme === THEMES.dark) {
        taskCardClasses += " task-card_dark";
    }

    return (
        <div className={taskCardClasses}>
            <p>{props.text}</p>
            {deleteButton}
            <select defaultValue={props.status} onChange={handleStatusChange}>
                {Object.values(TASK_STATUSES).map((item) => (
                    <option value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};

export default TaskCard;