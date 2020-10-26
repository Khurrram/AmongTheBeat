import React from 'react';
import LandingBox from './LandingBox';
import './LandingPage.css';
// import 'materialize-css/dist/css/materialize.min.css'
import AtBtext from './LandingPage_assets/atb.gif'

function LandingPage() {
    return (
        <div class="row full-height">
            <div class="col s7 m7 l7 full-height">
                <div className="gif-overlay center-align">
                <img className="atb-gif"src={AtBtext} alt="loading..."></img>
                <h1 class="white-text">more than a web-player</h1>
                </div>
            </div>
            <div class="col s3 m3 l3 offset-s2 offset-m2 offset-l2 full-height valign-wrapper">
                    <LandingBox />
            </div>
        </div>
    );
}

export default LandingPage;