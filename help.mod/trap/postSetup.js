function postSetup(e) {
    _.job.helper.report()

    _$.mod.console.cmd.attach(_.cmd.sync)

    if (_$.env.config && _$.env.config.man) {
        const manTopic = _$.env.config.man
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
