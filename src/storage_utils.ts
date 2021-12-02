export function initStorage() {
    let date = new Date()
    localStorage['start_time'] = '' + date.getTime()
    localStorage['last_time'] = '' + date.getTime()
    localStorage['timings'] = JSON.stringify([])
    localStorage['counter'] = '0'
    localStorage['cleared'] = '0'
}