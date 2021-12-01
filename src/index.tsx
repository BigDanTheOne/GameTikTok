import React from 'react'
import ReactDOM from 'react-dom'
import './styles/globals.sass'
import App from './App'
import reportWebVitals from './reportWebVitals'

let date = new Date()
localStorage['start_time'] = '' + date.getTime()
localStorage['last_time'] = '' + date.getTime()
localStorage['timings'] = JSON.stringify([])


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
