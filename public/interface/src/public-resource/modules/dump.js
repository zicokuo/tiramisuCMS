export function dump (msg, title = '无', mode = '信息') {
  console.log('----> ' + mode + ':' + title)
  console.log(msg)
  console.log(' ')
}