import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";

axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable to Logout. Please try again");
  };

  const handlerLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h3">Mern Auth</Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <Tabs
            indicatorColor="secondary"
            onChange={(e, val) => setValue(val)}
            value={value}
            textColor="inherit"
          >
            {!isLoggedIn && (
              <>
                <Tab to="/login" LinkComponent={Link} label="Login" />
                <Tab to="/signup" LinkComponent={Link} label="Signup" />
              </>
            )}
            {isLoggedIn && (
              <Tab
                onClick={handlerLogout}
                to="/"
                LinkComponent={Link}
                label="Logout"
              />
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
