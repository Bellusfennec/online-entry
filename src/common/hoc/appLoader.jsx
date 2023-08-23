/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedStatus,
  getUserLoadingStatus,
  loadedUser,
} from "../../store/user";
import { Loading } from "../components/loading";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getLoggedStatus());
  const isLoading = useSelector(getUserLoadingStatus());

  useEffect(() => {
    if (isLogged) dispatch(loadedUser());
  }, [isLogged]);

  if (isLoading) {
    return <Loading />;
  }

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
