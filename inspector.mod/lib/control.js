// show node inspector
function show() {
    __$.disableOthers()
    // __$.hidden = false
    __$.show()
    lab.hud.inspector.show()
}

function open(node, layoutMode, panelMode) {
    if (isString(node)) {
        node = $.selectOne(node)
    }
    lab.hud.inspector.open(node, layoutMode, panelMode)
    if (__$.hidden) lib.control.show()
}

// hide node inspector
function hide() {
    __$.enableOthers()
    //__$.hidden = true
    __$.hide()
    lab.hud.inspector.hide()
}
