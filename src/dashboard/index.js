import React, { useEffect, useState } from "react";
import { fire_auth } from "../firebase";
import { getAbsoluteDate, getTasks } from "../operations/user_operations.jsx";
import { Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
import TaskSection from "../components/dashboard/tasks_section";
import { getRecords } from "../operations/records_operations";
import TaskLineChart from "../components/charts/line_chart";
import CustomDateRangePicker from "../components/charts/date_range_picker";
import DropDownOptions from "../components/charts/drop_down";
import { CustomPie } from "../components/charts/pie";

function Dashboard(props) {
    const [tasks, setTasks] = useState(null);
    const [lastAction, setLastAction] = useState(null);
    const [records, setRecords] = useState([]);
    const [filter, setFilter] = useState({
        ...getAbsoluteDate(7, true),
        ...getAbsoluteDate(0, false),
    });
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fire_auth.onAuthStateChanged(async (user) => {
            if (user == null) {
                window.location.replace("/login");
            } else {
                await getData();
                setLoading(false);
            }
        });
    }, []);

    const getData = async () => {
        setLoading(true);
        const data = await getTasks();
        setTasks(data.tasks);
        setLastAction(data.lastAction);
        setRecords(await getRecords());
        setLoading(false);
    };

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <TaskSection
                tasks={tasks}
                lastAction={lastAction}
                getData={getData}
                setError={props.setError} setSuccess={props.setSuccess}
            />

            <Box style={{ width: "80%" }}>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ height: "5vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "95%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography component="h1"
                                variant="h6"
                                fontWeight="bold"
                                noWrap></Typography>
                            <Button variant="contained" color="error" style={{ fontWeight: "bolder" }} onClick={() => {
                                fire_auth.signOut();
                            }}>LOGOUT</Button>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            paddingTop: "20px"
                        }}
                    >
                        <TaskLineChart
                            tasks={tasks}
                            data={records}
                            filter={filter}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            height: "50%",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CustomPie
                                tasks={tasks}
                                data={records}
                                filter={filter} />
                        </div>
                        <div
                            style={{
                                width: "55%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <DropDownOptions setFilter={setFilter} />
                            <CustomDateRangePicker
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default Dashboard;
