import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import SettingIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import SearchBar from "material-ui-search-bar";
import { Search } from "@material-ui/icons";
import testplay from "../data/testsongs.json";
import axios from "axios";
import { session } from "passport";

function HomeDashView(props) {
  return (
    <StyledDiv>
      <h1>DASHBOARD</h1>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 1.5rem;
  margin-right: 1rem;

  & span {
    display: flex;
    align-items: center;
  }

  & span hr {
    width: 100%;
    color: white;
    background-color: white;
  }

  & h1 {
    color: white;
    font-weight: bold;
  }

  & h6 {
    color: white;
  }
`;
export default HomeDashView;
