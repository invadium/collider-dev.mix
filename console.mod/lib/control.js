// show console
function show() {
    __$.disableOthers()
    __$.show()
    lab.hud.captureFocus(lab.hud.console)
    lab.hud.console.show()
}

// hide console
function hide() {
    __$.enableOthers()
    lab.hud.releaseFocus(lab.hud.console)
    lab.hud.console.hide()
    __$.hide()
}
