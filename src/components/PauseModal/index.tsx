import React from 'react'
import css from './styles.module.sass'
import { observer } from 'mobx-react'
import cn from 'classnames'
import store from '../../store'

function PauseModal() {
  return (
    <>
      <div className={cn(css.overlay, { [css.overlayActive]: store.currentGame.paused })} onClick={() => store.updateGame(store.currentGame.id, 'paused', false)}/>
      <div className={cn(css.modal, { [css.modalActive]: store.currentGame.paused })}>
        <span>Пауза</span>
      </div>
    </>
  )
}

export default observer(PauseModal)