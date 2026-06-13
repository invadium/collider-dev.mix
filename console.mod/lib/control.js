// show the console
function open() {
    __$.disableOthers()
    if (__$.env.pauseRootLab) {
        $.pauseLab()
    }
    __$.show()
    lab.hud.captureFocus(lab.hud.console)
    lab.hud.console.show()
    signal('open')
}

// hide the console
function close() {
    __$.enableOthers()
    lab.hud.releaseFocus(lab.hud.console)
    lab.hud.console.resetHistory()
    lab.hud.console.hide()
    if (__$.env.pauseRootLab) {
        $.resumeLab()
    }
    __$.hide()
    signal('close')
}
