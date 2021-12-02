import React from 'react'
import ReactDOM from 'react-dom'
import './styles/globals.sass'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {genUID} from "./storage_utils";

genUID()

function muteMe(elem: any) {
    elem.muted = true;
    elem.pause();
}

// Try to mute all video and audio elements on the page
document.querySelectorAll("video, audio").forEach( elem => muteMe(elem) );



ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
