function postSetup(e) {
    __$.job.helper.report()

    $.mod.console.cmd.attach(__$.cmd.sync)

    if ($.env.config && $.env.config.man) {
        const manTopic = $.env.config.man
        defer(() => {
            let postfix = ''
            if (isString(manTopic)) {
                postfix = `#${encodeURIComponent(manTopic)}`
                log(`opening help for: [${manTopic}]...`)
            } else {
                log('opening help...')
            }
            window.open(`collider-dev.mix/help.html${postfix}`, '_blank')
        }, 3)
    }
}
