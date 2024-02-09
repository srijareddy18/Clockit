import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { addTask } from "../../operations/user_operations";
import { LoadingButton } from "@mui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTaskDialog(props) {
    const [task, setTask] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {
        setTask("");
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        style={{ width: "100%" }}
                        value={task}
                        onChange={(event) => {
                            setTask(event.target.value);
                        }}
                        placeholder="Task Name"
                    />
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={loading}
                        variant="outlined"
                        onClick={async () => {
                            setLoading(true);
                            if (task === "") {
                                props.setError("Task Name cannot be empty");
                                setLoading(false);
                            } else if (props.checkIfExist(task)) {
                                props.setError("Task already exist!");
                                setLoading(false);
                            } else {
                                await addTask(task.toLowerCase());
                                await props.getTasks();
                                props.setSuccess("Task Added Successfully!");
                                handleClose();
                                setLoading(false);
                            }
                        }}
                    >
                        ADD TASK
                    </LoadingButton>
                    <Button onClick={handleClose} variant="outlined">
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
