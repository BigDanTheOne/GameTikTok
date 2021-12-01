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

window.addEventListener("beforeunload", (ev) =>
{
    ev.preventDefault();
    window.alert("final:" + localStorage['counter'])
    return ev.returnValue = 'Are you sure you want to close?';
});
export default App