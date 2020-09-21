/**
 * 日志
 */
// 错误日志
function error (err) {
  console.log('err', err)
}

function logger (content) {
  console.log('content', content)
}

module.exports = {
  error,
  logger
}
