export function dump (msg, mode) {
  console.log(mode || 'INFO:' + new Date() + ' - ' + msg)
}