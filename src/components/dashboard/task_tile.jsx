import React from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import {
    AccessTime,
    DeleteOutline,
    EditOutlined,
    TaskAlt,
} from "@mui/icons-material";
import { startTask } from "../../operations/records_operations";
import { removeTask } from "../../operations/user_operations";

function TaskTile(props) {
    return (
        <ButtonGroup
            style={{
                width: "90%",
                margin: "10px 0px 10px 0px",
            }}
            key={props.item}
            variant="contained"
            aria-label="Disabled elevation buttons"
        >
            <Button
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: props.start ? "rgb(0,153,0)" : "white",
                    color: "black",
                    fontWeight: "bold",
                }}
                onClick={async () => {
                    await startTask(props.item);
                    await props.getData();
                }}
            >
                <Box
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                    }}
                >
                    {props.start ? (
                        <AccessTime
                            style={{
                                marginRight: "15px",
                                color: "white",
                            }}
                        />
                    ) : (
                        <TaskAlt style={{ marginRight: "15px" }} />
                    )}
                    <Typography
                        fontWeight="bold"
                        style={{
                            color: props.start ? "white" : "black",
                        }}
                    >
                        {props.item}
                    </Typography>
                </Box>
            </Button>
            <Button
                onClick={() => {
                    props.setEditTask(props.item);
                }}
            >
                <EditOutlined />
            </Button>
            <Button
                style={{
                    backgroundColor: "rgba(201,0,40,0.95)",
                }}
                onClick={async () => {
                    await removeTask(props.item);
                    await props.getData();
                }}
            >
                <DeleteOutline />
            </Button>
        </ButtonGroup>
    );
}

TaskTile.propTypes = {};

export default TaskTile;
