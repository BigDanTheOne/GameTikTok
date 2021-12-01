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

window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    ev.returnValue = '';
    sendSessionInfo()
});

export default App