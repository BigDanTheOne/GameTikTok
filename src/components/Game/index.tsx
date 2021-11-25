import React, { useEffect, useState } from 'react'
import { IGame } from '../../types'
import css from './styles.module.sass'

interface IProps extends IGame {

}

export default function Game({ id, src, name }: IProps) {
  const [height, setHeight] = useState(window.innerHeight - window.innerWidth * .1)

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      console.log(window.innerHeight)
      setHeight(
        window.innerHeight - window.innerWidth * .1,
      )
    })
  }, [])

  return (
    <div className={css.gameWrapper}>
      <iframe
        src={src}
        title={name}
        height={height}
        width={window.innerWidth}
        className={css.game}
      />
    </div>
  )
}