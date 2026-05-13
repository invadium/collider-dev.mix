/*
 * a coordinate grid to gauge relative dimensions in the world space
 *
 * Can be created in two styles - "dots"(default) and "grids":
 *
 *     lab.port.spawn('CoordGrid', {
 *         Z:          1,
 *         style:     'dots',
 *         step:       100,
 *         lineWidth:  2,     // set the dot size
 *     })
 *     lab.port.spawn('CoordGrid', {
 *         Z:          0,
 *         style:     'grid',
 *         step:       50,
 *         color:     '#808080',
 *         lineWidth:  1,
 *     })
 */

const DOTS = 'dots'
const GRID = 'grid'

class CoordGrid {

    constructor(st) {
        augment(this, {
            name:      'coordGrid',
            step:       50,         // step in the world space
            color:     '#808080',
            lineWidth:  1,

            style:      DOTS,     // dots or grid

            debugOnly:  true,
        }, st)
    }

    draw() {
        if (!this.debugOnly && !(env.debug || env.config.debug)) return

        const color = this.color
        let step = this.step,
            LW = this.lineWidth,
            bx = 0,
            by = 0,
            ex = ctx.width,
            ey = ctx.height

        if (this.port) {
            // TODO figure local boundaries for deeper nodes (2+)
            bx = this.port.lx(bx)
            by = this.port.ly(by)
            ex = this.port.lx(ex)
            ey = this.port.ly(ey)
        }
        if (ey < by) {
            const nby = ey
            ey = by
            by = nby
        }
        // adjust to the step
        const BX = bx - bx % step
        const BY = by - by % step

        switch(this.style) {
            case DOTS:
                const dR = .5 * LW
                for (let y = BY; y <= ey; y += step) {
                    for (let x = BX; x <= ex; x += step) {
                        fill(color)
                        rect(x-dR, y-dR, 2*dR, 2*dR)
                    }
                }
                break
            case GRID:
                lineWidth(LW)
                stroke(color)
                for (let x = BX; x <= ex; x += step) {
                    line(x, BY, x, ey)
                }
                for (let y = BY; y <= ey; y += step) {
                    line(bx, y, ex, y)
                }
                break
        }
    }

}
CoordGrid.DOTS = DOTS
CoordGrid.GRID = GRID

