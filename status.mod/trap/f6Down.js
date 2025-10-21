let shots = 0

module.exports = function(e) {
    if (e.repeat) return

    if (__$.hidden) __$.show()
    else __$.hide()
}
