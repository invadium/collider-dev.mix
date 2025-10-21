'use strict'

module.exports = function() {
    // link global mod env instead of the local one
    __$.link($.env, 'env')

    __$.hide()
}
