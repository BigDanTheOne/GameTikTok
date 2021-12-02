import {nanoid} from 'nanoid'

export function genUID() {
    localStorage['uid'] = nanoid()
}