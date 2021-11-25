import React from 'react'
import cn from 'classnames'
import css from './styles.module.sass'
import images from '../../images'

interface IProps {
  value: boolean
  icon: string
  activeIcon?: string
  activeClassName?: string
  hideLight?: boolean
  onClick: (newValue: boolean) => any
}

export default function FooterButton({ value, icon, activeIcon, activeClassName, hideLight, onClick }: IProps) {
  return (
    <div onClick={() => onClick(!value)} className={css.buttonWrapper} style={{ backgroundImage: value && !hideLight ? `url(${images.light})` : 'none' }}>
      <img
        src={value ? activeIcon : icon}
        alt={icon}
        className={cn(css.button, { [activeClassName || css.active]: value })}
      />
    </div>
  )
}