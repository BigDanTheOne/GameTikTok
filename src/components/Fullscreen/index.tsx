import React, { useEffect } from 'react'
import css from './styles.module.sass'
import images from '../../images'
import store from '../../store'
import { observer } from 'mobx-react'

const element = document.body as any

function Fullscreen() {
  useEffect(() => {
    document.onfullscreenchange = () => {
      store.isFullscreen = !!document.fullscreenElement
    }
  }, [])

  const onClick = () => {
    if (store.isFullscreen) {
      document.exitFullscreen()
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen()
          .catch(console.log)
      }
      else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      }
      else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
      }
      else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    }
  }

  if (!(
    element.requestFullscreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullScreen ||
    element.msRequestFull
  ))
    return null

  return <div className={css.fullscreen} onClick={onClick}>
    <img src={store.isFullscreen ? images.closefullscreen : images.fullscreen} alt='toggle fullscreen' className={css.image}/>
  </div>
}

export default observer(Fullscreen)