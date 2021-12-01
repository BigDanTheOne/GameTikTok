import React, { useEffect, useRef } from 'react'
import Game from '../Game'
import store from '../../store'
import { observer } from 'mobx-react'
import css from './styles.module.sass'
import settings from '../../constants/settings'

const getDefaultPosition = () => (
  store.games.length === settings.preloadBefore + 1 + settings.preloadAfter ?
    window.innerHeight * settings.preloadBefore :
    0
)

function Games() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    store.moveGames = (offset: number) => {
      ref.current && (ref.current.onscroll = () => {
        ref.current && (ref.current.onscroll = () => ref.current && (ref.current.scrollTop = getDefaultPosition()))
      })
      ref.current?.scrollTo({
        top: (
          getDefaultPosition()
        ) +
          offset,
      })
    }

    ref.current && (ref.current.onscroll = () => {
      ref.current && (ref.current.scrollTop = getDefaultPosition())
    })
  }, [ref.current])

  useEffect(() => {
    ref.current?.scrollTo({
      top: getDefaultPosition(),
      behavior: 'smooth',
    })
  }, [store.offset])

  return (
    <div className={css.games} ref={ref}>
      {store.games.map(item => <Game key={item.id} isInitial={store.offset === 0} {...item} />)}
    </div>
  )
}

export default observer(Games)