import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login_page";
import Dashboard from "./dashboard";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

function App() {
    const [success, setSuccess] = useState({ open: false, message: "" });
    const [error, setError] = useState({ open: false, message: "" });

    const setSuccessMsg = (str) => {
        if (str) {
            setSuccess((state) => ({
                open: true, message: str
            }))
        } else {
            setSuccess((state) => ({
                ...state, open: false
            }))
        }
    }

    const setErrorMsg = (str) => {
        if (str) {
            setError((state) => ({
                open: true, message: str
            }))
        } else {
            setError((state) => ({
                ...state, open: false
            }))
        }
    }

    return (
        <div className="App">
            <Snackbar open={error.open} autoHideDuration={6000} onClose={() => { setErrorMsg(""); }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert variant="filled" onClose={() => { setErrorMsg(""); }} severity="error" sx={{ width: '100%' }}>
                    {error.message}
                </Alert>
            </Snackbar>
            <Snackbar open={success.open} autoHideDuration={6000} onClose={() => { setSuccessMsg(""); }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert variant="filled" onClose={() => { setSuccessMsg(""); }} severity="success" sx={{ width: '100%' }}>
                    {success.message}
                </Alert>
            </Snackbar>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage setError={setErrorMsg} setSuccess={setSuccessMsg} />} />
                    <Route path="login" element={<LoginPage setError={setErrorMsg} setSuccess={setSuccessMsg} />} />
                    <Route path="dashboard" element={<Dashboard setError={setErrorMsg} setSuccess={setSuccessMsg} />} />
                    <Route path="*" element={<div>404 NOT FOUND</div>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
