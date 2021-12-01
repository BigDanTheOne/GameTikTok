import React from 'react'
import Games from './components/Games'
import Footer from './components/Footer'
import PauseModal from './components/PauseModal'
import Fullscreen from './components/Fullscreen'
import {YMInitializer} from 'react-yandex-metrika';

function App() {
    return (
        <>
            <YMInitializer accounts={[987654321]} options={{webvisor: true}}/>
            <Games/>
            <Footer/>
            <PauseModal/>
            <Fullscreen/>
        </>
    )
}

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }
    return os;
}

function sendSessionInfo() {
    let session = {
        start_time: parseInt(localStorage['start_time']),
        counter: parseInt(localStorage['counter']),
        timings: JSON.parse(localStorage['timings'])
    };


    let response = fetch('http://104.131.8.16:8080/stats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(session)
    })
}

window.onblur = () => sendSessionInfo();


const os = getOS()
window.addEventListener(os === 'iOS' ? 'mouseout' : 'blur', (ev) => {
    sendSessionInfo()
});

export default App