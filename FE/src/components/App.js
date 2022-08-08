import React, { useEffect } from "react";

import RouterConfiguration from "../configs/router";
import { Outlet } from "react-router-dom";

import storage from "../helper/storage";
import { requestMyInfo } from "../apis/user";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfoToStore } from "../stores/user";

import { Box } from "@mui/material";

import NavBar from "./organism/NavBar";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = storage.get("token");

  useEffect(() => {
    if (token) {
      requestMyInfo(
        res => {
          dispatch(setUserInfoToStore(res.data));
        },
        err => {
          storage.remove("token");
          navigate("/");
        },
      );
    }
  }, []);

  return (
    <Box>
      {location.pathname !== "/" && (
        <Box>
          <Box sx={{ width: "100vw", height: "10vh" }}></Box>
          <NavBar />
        </Box>
      )}
      <RouterConfiguration />
      <Outlet />
    </Box>
  );
}
