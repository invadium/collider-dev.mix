'use strict'

/*
function getLocal(name) {
    if (!isFrame(__$.cmd)) return

    const fn = __$.cmd._dir[name]
    if (!isFun(fn)) return
    return fn
}

function getGlobal(name) {
    if (!isFrame($.cmd)) return

    const fn = $.cmd._dir[name]
    if (!isFun(fn)) return
    return fn
}
*/

module.exports = function setup() {
    __$.hide()

    const hud = lab.spawn('hud/Hud', {
        'name': 'hud'
    })

    const con = hud.spawn('hud/gadget/Console', {
        hidden: true,
        name: 'console',
        x: 0,
        y: 0,
        cur: $,

        adjust: function() {
            this.w = ctx.width
            this.h = ctx.height/2
        },
        close: function() {
            lib.control.close()
        },
    })

    function print(msg) {
        if (__$.env.logToConsole) con.print(msg)
    }

    // bind log functions to out console
    __$.env.logToConsole = true
    sys.after($.log, 'debug', (msg, more) => print('# ' + msg + (more? more : '')))
    sys.after($.log, 'out', (msg, more) => print(msg +(more? more: '' )))
    sys.after($.log, 'warn', (msg, more) => print('? ' + msg + (more? more : '')))
    sys.after($.log, 'err', (msg, more) => print('! ' + msg + (more? more : '')))
    sys.after($.log, 'dump', (obj) => { print(obj) })

    con.lookupList = []
    if (isFrame($.cmd)) con.lookupList.push($.cmd)
    if (isFrame(__$.cmd)) con.lookupList.push(__$.cmd)

    con.locateCommand = function(name) {
        const ls = this.lookupList

        for (let i = 0; i < ls.length; i++) {
            const frame = ls[i]
            const fn = frame._dir[name]
            if (isFun(fn)) return fn
        }
    }

    // define command processing
    con.onCommand = function(cmd) {
        if (!cmd) return
        const words = cmd.split(' ')
        if (words.length === 0) return
        const command = words[0]
        words.line = cmd

        const fn = this.locateCommand(command) || this.locateCommand('_default')

        if (fn) {
            try {
                const res = fn.call(this, words, cmd, con)
                if (res) con.print(res)
            } catch (e) {
                con.print(e)
                console.error(e)
            }

        } else {
            con.print('unknown command: [' + command + ']')
        }
    }

}

