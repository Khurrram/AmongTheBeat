import React from 'react';
import LandingBox from './LandingBox';
import './LandingPage.css';
import AtBtext from './LandingPage_assets/atb.gif'

function LandingPage() {
    return (
        <div class="row full-height">
            <div class="col s7 full-height">
                <div className="gif-overlay center-align">
                <img className="atb-gif"src={AtBtext} alt="loading..."></img>
                <h1 class="white-text">more than a web-player</h1>
                </div>
            </div>
            <div class="col s3 full-height valign-wrapper">
                    <LandingBox />
            </div>
            <div class="col s2 full-height">
            </div>
        </div>
    );
}

export default LandingPage;