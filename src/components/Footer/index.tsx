import React, { useState } from 'react'
import images from '../../images'
import FooterButton from '../FooterButton'
import Joystick from '../Joystick'
import css from './styles.module.sass'
import { observer } from 'mobx-react'
import store from '../../store'
import { IGame } from '../../types'

enum ETabs {
  Home,
  Bookmarks
}

// Mute a singular HTML5 element
function muteMe(elem: any) {
    elem.muted = true;
    elem.pause();
}

// Try to mute all video and audio elements on the page
function mutePage() {
    document.querySelectorAll("video, audio").forEach( elem => muteMe(elem) );
}

function Footer() {
  const [tab, setTab] = useState(ETabs.Home)

  const handleChange = (name: keyof IGame) =>
    (newValue: boolean) => store.updateGame(store.currentGame.id, name, newValue)

  return (
    <footer className={css.footer} style={{ backgroundImage: `url(${images.footer})` }}>
      <div className={css.group}>
        <FooterButton
          value={tab === ETabs.Home}
          icon={images.home}
          activeIcon={images.activeHome}
          onClick={(value) => setTab(value ? ETabs.Home : ETabs.Home)}
        />
        <FooterButton
          value={store.currentGame.paused}
          icon={images.pause}
          activeIcon={images.play}
          hideLight
          onClick={handleChange('paused')}
        />
      </div>
      <Joystick />
      <div className={css.group}>
        <FooterButton
          value={tab === ETabs.Bookmarks}
          icon={images.sound}
          activeIcon={images.activeSound}
          onClick={(value) => {
              setTab(value ? ETabs.Bookmarks : ETabs.Home)
              mutePage()
          }}
        />
        <FooterButton
          value={store.currentGame.liked}
          icon={images.like}
          activeIcon={images.activeLike}
          activeClassName={css.likeActive}
          hideLight
          onClick={handleChange('liked')}
        />
      </div>
    </footer>
  )
}

export default observer(Footer)