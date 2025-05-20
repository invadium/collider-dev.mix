// show console
function show() {
    _.disableOthers()
    _.show()
    lab.hud.captureFocus(lab.hud.console)
    lab.hud.console.show()
}

// hide console
function hide() {
    _.enableOthers()
    lab.hud.releaseFocus(lab.hud.console)
    lab.hud.console.hide()
    _.hide()
}
