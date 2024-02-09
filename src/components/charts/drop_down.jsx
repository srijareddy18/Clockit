import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { getAbsoluteDate } from "../../operations/user_operations";

export default function DropDownOptions(props) {
    const [title, setTitle] = React.useState("Last 7 Days");
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                        {title}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem
                            onClick={() => {
                                setTitle("Last 7 Days");
                                props.setFilter({
                                    ...getAbsoluteDate(7, true),
                                    ...getAbsoluteDate(0, false),
                                });
                                popupState.close();
                            }}
                        >
                            Last 7 Days
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setTitle("Last 10 Days");
                                props.setFilter({
                                    ...getAbsoluteDate(10, true),
                                    ...getAbsoluteDate(0, false),
                                });
                                popupState.close();
                            }}
                        >
                            Last 10 Days
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setTitle("Last 20 Days");
                                props.setFilter({
                                    ...getAbsoluteDate(20, true),
                                    ...getAbsoluteDate(0, false),
                                });
                                popupState.close();
                            }}
                        >
                            Last 20 Days
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setTitle("Last 30 Days");
                                props.setFilter({
                                    ...getAbsoluteDate(30, true),
                                    ...getAbsoluteDate(false),
                                });
                                popupState.close();
                            }}
                        >
                            Last 30 Days
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}
