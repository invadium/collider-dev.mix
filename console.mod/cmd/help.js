'use strict'

function help(args, line, con) {
    con.print('available console commands:')

    function listCommands(catalog) {
        if (!catalog || !catalog._dir) return

        const dir = catalog._dir
        Object.keys(dir).forEach(name => {
            const fn = dir[name]
            if (sys.isFun(fn)) {
                const args = fn.args? ' ' + fn.args : ''
                if (sys.isString(fn.info)) con.print(name + args + ' - ' + fn.info)
                else con.print(name)
            }
        })
    }

    const lookupList = this.lookupList
    for (let i = 0; i < lookupList.length; i++) {
        const catalog = lookupList[i]
        listCommands(catalog)
    }

    con.print('-------------------------------------------------')
    con.print('place commands in root or console mod /cmd folder')
}

help.info = 'show this message'
