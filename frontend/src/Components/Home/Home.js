import React from 'react'
import './homestyling.css';

function Home() {
  return (
            <div class="App">
              <img src={require("../../Assets/Bg1.jpg")} alt="University Logo" class="university-logo"></img>
              <h1>Welcome to CS732</h1>
              <br/>
              <div class="section-title">Human Computer Interaction</div>
              <div class="section-title1">Our Project: Voice Emotion Detection</div>
              <br/>
              <div class="button-container">
                <a href="/mainpage" class="button">Project Demo</a>
              </div>
            </div>
    )
}

export default Home