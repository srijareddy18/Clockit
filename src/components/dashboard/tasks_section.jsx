import React, { useState } from "react";
import { IconButton, List, Stack, Typography } from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";

import PropTypes from "prop-types";
import { addTask } from "../../operations/user_operations";
import AddTaskDialog from "../dialogs/add_task_dialog";
import EditTaskDialog from "../dialogs/edit_task_dialog";
import TaskTile from "./task_tile";

function TaskSection(props) {
    const [openAdd, setOpen] = useState(false);
    const [editTask, setEditTask] = useState("");

    function checkIfExist(task) {
        return props.tasks.includes(task.toLowerCase());
    }

    return (
        <Stack
            style={{
                width: "20%",
                backgroundColor: "rgb(226,226,226)",
            }}
        >
            <div
                style={{
                    backgroundColor: "darkred",
                    height: "5vh",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="white"
                    fontWeight="bold"
                    noWrap
                >
                    Tasks
                </Typography>
                <IconButton
                    aria-label="upload picture"
                    component="label"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <LibraryAdd style={{ color: "white" }} />
                </IconButton>
            </div>
            <List>
                {props.tasks &&
                    props.tasks.map((item) => {
                        return (
                            <TaskTile
                                key={item}
                                item={item}
                                start={props.lastAction.task === item}
                                setEditTask={setEditTask}
                                getData={props.getData}
                            />
                        );
                    })}
            </List>

            <AddTaskDialog
                setOpen={setOpen}
                open={openAdd}
                addTask={addTask}
                getTasks={props.getData}
                checkIfExist={checkIfExist}
                setError={props.setError} setSuccess={props.setSuccess}
            />

            <EditTaskDialog
                setEditTask={setEditTask}
                task={editTask}
                getTasks={props.getData}
                checkIfExist={checkIfExist}
                setError={props.setError} setSuccess={props.setSuccess}
            />
        </Stack>
    );
}

TaskSection.propTypes = {
    getData: PropTypes.func,
    tasks: PropTypes.array,
};

export default TaskSection;
