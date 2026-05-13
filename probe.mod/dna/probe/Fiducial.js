/*
 * draws crosshair reticles on the screen as anchors for screen elements position and sizing.
 *
 * Usually created on the top level in /lab,
 * but can be placed deeper in the hierarchy -
 * in that case Fiducial will look for the parent
 * container up the chain automatically.
 * It might be /lab or any other container down the path
 * with rectangle dimensions defined, including Fiducial itself.
 * The parent container dimensions will be used as a reference
 * for fiducial marker placement calculation.
 *
 * Usage:
 *     lab.spawn('Fiducial')
 *
 */
class Fiducial {

    constructor(st) {
        augment(this, {
            name:      'fiducial',
            color:     '#80808080',
            lineWidth:  1,
            crossSize:  25,
            downscale: .5,

            levels:     2,
        }, st)
    }

    adjust() {}

    draw() {
        this.adjust()
        const { color, crossSize, downscale } = this
        const lw = this.lineWidth

        stroke(color)
        lineWidth(lw)

        function cross(x, y, r) {
            line(x-r, y,   x+r, y  )
            line(x,   y-r, x,   y+r)
        }

        function group(x, y, cs, dx, dy, more) {
            if (more === 0) return

            cross( x-dx, y-dy, cs )
            group( x-dx, y-dy, cs * downscale, .5*dx, .5*dy, more-1 )
            cross( x-dx, y+dy, cs )
            group( x-dx, y+dy, cs * downscale, .5*dx, .5*dy, more-1 )
            cross( x+dx, y+dy, cs )
            group( x+dx, y+dy, cs * downscale, .5*dx, .5*dy, more-1 )
            cross( x+dx, y-dy, cs )
            group( x+dx, y-dy, cs * downscale, .5*dx, .5*dy, more-1 )
        }

        function lookUpContainer(node) {
            if (isNum(node.x) && isNum(node.y) && isNum(node.w) && isNum(node.h)) return node
            if (node.__) return lookUpContainer(node.__)
        }
        const cn = lookUpContainer(this)
        const W = cn? cn.w : rx(1)
        const H = cn? cn.h : ry(1)

        save()
        if (cn === this) translate(this.x, this.y)

        // TODO derive coordinates and shift from the parent container
        cross( .5 * W, .5 * H, crossSize)
        group( .5 * W, .5 * H, crossSize * downscale, .25 * W, .25 * H, this.levels )

        restore()
    }

}
