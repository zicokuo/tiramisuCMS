export function dump (msg, title, mode = '信息') {
  console.log('=======================================')
  console.log('调试模式:  ' + mode + new Date())
  console.log('调试标题:  ' + title)
  if (typeof msg === 'string') {
    console.log('调试信息:  ' + msg)
  } else {
    console.log('调试信息:')
    console.log(msg)
  }
  console.log('=======================================')
}