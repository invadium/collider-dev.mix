'use strict'

module.exports = function(e) {
    if (e.repeat) return

    if (__$.hidden) {
        // __$.hidden = false
        __$.show()

        if (lab.hud._ls.length < 2) {
            trap('explore')
        }

    } else {
        // __$.hidden = true
        __$.hide()
    }
}
