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

function sendSessionInfo(reason: string) {
    let timings = JSON.parse(localStorage['timings'])

    let time = new Date()
    timings.push(time.getTime() - parseInt(localStorage['last_time']))
    localStorage['timings'] = JSON.stringify(timings)

    let session = {
        start_time: parseInt(localStorage['start_time']),
        counter: parseInt(localStorage['counter']),
        timings: JSON.parse(localStorage['timings']),
        reason: reason
    };

    localStorage['counter'] = '0'


    let response = fetch('http://104.131.8.16:8081/stats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(session)
    })
}

const os = getOS()
// if (os == 'iOS') {
//     window.addEventListener('mouseout', (ev) => {
//         sendSessionInfo()
//     })
// } else {
window.onblur = () => sendSessionInfo('onblur');
window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    ev.returnValue = '';
    sendSessionInfo('beforeunload');
});
// }


export default App