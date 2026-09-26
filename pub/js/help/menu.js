'use strict'

/*
 * The floating menu of the help page.
 *
 * Driven by a list of item descriptors, so a new entry is
 * a line in that list, not another branch in here.
 *
 * Item types:
 *     choice - one of options[], get() and set(i) by index,
 *              collapsible: true folds the options under a header
 *     toggle - on or off, get() and set(on)
 *     action - run() it and close the menu
 */

const MENU   = 'menu'
const BUTTON = 'menuButton'

const MARK_CHOICE = '•'    // bullet
const MARK_TOGGLE = '✓'    // check
const MARK_FOLDED = '▸'
const MARK_OPENED = '▾'

var items = []

// ids of collapsible items currently unfolded
const expanded = {}

function menuEl()   { return document.getElementById(MENU)   }
function buttonEl() { return document.getElementById(BUTTON) }

export function isMenuOpen() {
    return menuEl().classList.contains('menuOpen')
}

export function closeMenu() {
    menuEl().classList.remove('menuOpen')
    buttonEl().setAttribute('aria-expanded', 'false')
}

export function openMenu() {
    render()
    menuEl().classList.add('menuOpen')
    buttonEl().setAttribute('aria-expanded', 'true')
}

export function toggleMenu() {
    if (isMenuOpen()) closeMenu()
    else openMenu()
}

// redraw the marks after something changed the state from outside
export function refreshMenu() {
    if (isMenuOpen()) render()
}

function section(title) {
    const e = document.createElement('div')
    e.className = 'menuSection'
    e.textContent = title
    return e
}

function row(label, mark, onclick, value) {
    const e = document.createElement('div')
    e.className = 'menuItem'

    const m = document.createElement('span')
    m.className = 'menuMark'
    m.textContent = mark
    e.appendChild(m)

    const l = document.createElement('span')
    l.className = 'menuLabel'
    l.textContent = label
    e.appendChild(l)

    if (value !== undefined) {
        const v = document.createElement('span')
        v.className = 'menuValue'
        v.textContent = value
        e.appendChild(v)
    }

    // re-rendering detaches this row, so the outside-click
    // listener would no longer recognize it as ours
    e.onclick = function(ev) {
        ev.stopPropagation()
        onclick()
    }
    return e
}

function renderItem(item, menu) {
    switch (item.type) {

        case 'choice': {
            const selected = item.get()

            if (item.collapsible) {
                const open = !!expanded[item.id]
                const current = item.options[selected]
                menu.appendChild(row(item.title,
                    open? MARK_OPENED : MARK_FOLDED,
                    () => {
                        expanded[item.id] = !open
                        render()
                    },
                    current? current.name : ''))
                if (!open) break
            } else {
                menu.appendChild(section(item.title))
            }

            item.options.forEach((option, i) => {
                const e = row(option.name,
                    i === selected? MARK_CHOICE : '',
                    () => {
                        item.set(i)
                        // stays open - moods are meant to be tried on
                        render()
                    })
                if (item.collapsible) e.classList.add('menuSubItem')
                menu.appendChild(e)
            })
            break
        }

        case 'toggle':
            menu.appendChild(row(item.title,
                item.get()? MARK_TOGGLE : '',
                () => {
                    item.set(!item.get())
                    render()
                }))
            break

        case 'action':
            menu.appendChild(row(item.title, '', () => {
                closeMenu()
                item.run()
            }))
            break
    }
}

function render() {
    const menu = menuEl()
    menu.innerHTML = ''
    items.forEach(item => renderItem(item, menu))
}

export function initMenu(menuItems) {
    items = menuItems

    buttonEl().onclick = function(e) {
        // otherwise the document listener below closes it right away
        e.stopPropagation()
        toggleMenu()
    }

    document.addEventListener('click', function(e) {
        if (!isMenuOpen()) return
        if (menuEl().contains(e.target)) return
        closeMenu()
    })
}
