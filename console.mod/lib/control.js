// show the console
function open() {
    __$.disableOthers()
    __$.show()
    lab.hud.captureFocus(lab.hud.console)
    lab.hud.console.show()
}

// hide the console
function close() {
    __$.enableOthers()
    lab.hud.releaseFocus(lab.hud.console)
    lab.hud.console.hide()
    __$.hide()
}
