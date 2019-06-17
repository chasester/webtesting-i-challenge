module.exports = {
  succeed,
  fail,
  repair,
  get
};
function succeed(item) {

  return { ...item, enhancement: Math.min(item.enhancement+1, 20) };
}

function fail(item) {
  return { ...item, duriblity: Math.max(item.duriblity - (item.enhancement >= 15 ? 10 : 5), 0), enhancement: item.enhancement - (item.enhancement > 16 ? 1 : 0) };
}

function repair(item) {
  return { ...item, duriblity: 100};
}

function get(item) {
  return `${item.name} ${item.enhancement > 0 ? `[+${item.enhancement}]`: ""}`
}
