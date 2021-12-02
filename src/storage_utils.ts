export function initStorage() {
    let date = new Date()
    localStorage['start_time'] = '' + date.getTime()
    localStorage['timings'] = JSON.stringify([])
    localStorage['counter'] = '0'
}