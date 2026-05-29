'use strict'

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

    // define command processing
    con.onCommand = function(cmd) {
        if (!cmd) return
        const words = cmd.split(' ')
        if (words.length === 0) return
        const command = words[0]
        words.line = cmd

        // find a function
        let fn = getGlobal(command)
        if (!fn) fn = getLocal(command)

        if (fn) {
            try {
                const res = fn.call(this, words, cmd, con)
                if (res) con.print(res)
            } catch (e) {
                con.print(e)
                console.error(e)
            }

        } else {
            // check default handler
            fn = getGlobal('_default')
            if (!fn) fn = getLocal('_default')

            if (fn) {
                try {
                    const res = fn(words, cmd, con)
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

}

