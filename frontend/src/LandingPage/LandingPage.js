import React, { useContext } from "react";
import LandingBox from "./LandingBox";
import "./LandingPage.css";
import AtBtext from "./LandingPage_assets/atb.gif";
import { Row, Col } from "react-materialize";
import { SessionContext } from "../App";
import { Redirect } from "react-router-dom";

function LandingPage() {
  const session = useContext(SessionContext);
  console.log("LAND " + session.username);
  if (!session.username === undefined) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <Row className="full-height">
      <Col s={9} m={9} l={9}>
        <img className="atb-gif" src={AtBtext} alt="loading..."></img>
        <h1 className="white-text">more than a web-player</h1>
      </Col>
      <Col s={2} m={2} l={2}>
        <LandingBox className="landing-box" />
      </Col>
    </Row>
  );
}

export default LandingPage;
