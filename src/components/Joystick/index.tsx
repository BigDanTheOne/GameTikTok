import React, {useEffect, useRef, useState} from 'react'
import Slider from 'react-slider'
import css from './styles.module.sass'
import images from '../../images'
import store from '../../store'
import mergeRefs from 'react-merge-refs'
import ym from 'react-yandex-metrika';


const min = 20
const max = 200

export default function Joystick() {
    const [value, setValue] = useState(min)
    const [locked, setLocked] = useState(false)
    const [minBottom, setMinBottom] = useState(0)
    const [isNormalizing, setIsNormilizing] = useState(false)
    let counter = 0

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined

        if (!locked) {
            interval = setInterval(() => {
                setValue(
                    prev => {
                        if (prev === min) {
                            setIsNormilizing(false)
                            return min
                        }
                        !isNormalizing &&
                        ref.current &&
                        store.moveGames(parseFloat(getComputedStyle(ref.current).bottom) - minBottom)
                        return prev > min ?
                            Math.max(min, prev - Math.min(5, prev - 5)) :
                            Math.min(min, prev + Math.min(5, prev + 5))
                    },
                )
            }, 5)
        }

        return () => {
            interval && clearInterval(interval)
        }
    }, [locked, minBottom, store.moveGames, ref.current, isNormalizing])

    useEffect(() => {
        ref.current && setMinBottom(parseFloat(getComputedStyle(ref.current).bottom))
    }, [ref.current])

    const onChange = (newValue: number) => {
        setValue(newValue)
        if (!ref.current) return
        store.moveGames(parseFloat(getComputedStyle(ref.current).bottom) - minBottom)
    }

    const onBeforeChange = () => setLocked(true)
    const onAfterChange = (value: number) => {
        setLocked(false)
        console.log(store.currentGame.id, value, value > (max - min) / 2)
        if (value > (max - min) / 2) {
            store.nextGame()
            setIsNormilizing(true)
        }
        if (value < min / 2) {
            store.prevGame()
            setIsNormilizing(true)
        }
        ym('reachGoal', 'Swipe')
        counter++
        alert(counter)
    }

    return (
        <Slider
            className={css.slider}
            value={value}
            onChange={onChange}
            orientation='vertical'
            invert
            onBeforeChange={onBeforeChange}
            onAfterChange={onAfterChange}
            max={max}
            renderThumb={(props, state) => (
                <div
                    {...props}
                    ref={mergeRefs([props.ref, ref])}
                    className={css.thumb}
                    style={{
                        ...props.style,
                        backgroundImage: `url(${images.up})`,
                    }}
                />
            )}
        />
    )
}