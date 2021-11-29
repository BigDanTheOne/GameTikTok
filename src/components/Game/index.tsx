import React, { useEffect, useRef, useState } from 'react'
import { IGame } from '../../types'
import css from './styles.module.sass'

interface IProps extends IGame {
  isInitial: boolean
}

export default function Game({ isInitial, id, src, name }: IProps) {
  const [height, setHeight] = useState(window.innerHeight - window.innerWidth * .1)
  const ref = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      console.log(window.innerHeight)
      setHeight(
        window.innerHeight - window.innerWidth * .1,
      )
    })

    setTimeout(() => {
      ref.current && (ref.current.src = src)
    }, isInitial ? 0 : 1500)
  }, [])

  return (
    <div className={css.gameWrapper}>
      <iframe
        ref={ref}
        src={''}
        title={name}
        height={height}
        width={window.innerWidth}
        className={css.game}
      />
    </div>
  )
}