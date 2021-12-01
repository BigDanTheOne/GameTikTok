import React from 'react'
import Games from './components/Games'
import Footer from './components/Footer'
import PauseModal from './components/PauseModal'
import Fullscreen from './components/Fullscreen'
import {YMInitializer} from 'react-yandex-metrika';

function httpGet(theUrl: string) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

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

window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    ev.returnValue = '';
    httpGet('http://104.131.8.16:8080/test?count=' + localStorage['counter'])
});
export default App