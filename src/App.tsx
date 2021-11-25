import React from 'react'
import Games from './components/Games'
import Footer from './components/Footer'
import PauseModal from './components/PauseModal'
import Fullscreen from './components/Fullscreen'

function App() {
  return (
    <>
      <Games />
      <Footer />
      <PauseModal />
      <Fullscreen />
    </>
  )
}

export default App