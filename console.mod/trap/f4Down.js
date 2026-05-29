module.exports = function(e) {
    if (e.repeat) return

    if (__$.hidden) {
        lib.control.open()
    } else {
        lib.control.close()
    }
}
