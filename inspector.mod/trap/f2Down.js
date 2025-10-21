'use strict'

module.exports = function(e) {
    if (e.repeat) return

    if (__$.hidden) {
        lib.control.show()
    } else {
        lib.control.hide()
    }

    return false
}
