/*
 * shows the specified coordinates
 *
 * A test marker useful when you need to highlight a point
 * at particular location in the coordinate system of choice.
 *
 * Set the coordinates to show at the desired location:
 *
 *     lab.spawn('CoordMarker', {
 *         x:     px(75),  // place at 75% horizontally
 *         y:     py(25),  // place at 25% vertically
 *     })
 *
 * This will place the marker at the center of the screen.
 *
 * You can specify parameters like flipY, scale, font, color
 * and enable/disable various components with
 * showDot, showCross and showCoord.
 * Here is how to customize these parameters for a marker
 * in the port node.
 *
 *     lab.port.spawn('CoordMarker', {
 *         x:     100,
 *         y:     100,
 *         r:     50,      // the cross radius
 *         scale: 1.5,     // use to scale the marker up or down when needed
 *         flipY: true,    // flip the Y coordinate (so Y would grow up ^)
 *
 *         showDot:    false, // show the central dot
 *         showCross:  true,  // show the cross
 *         showCoord:  true,  // show the coordinates label
 *         font:      '32px moon',    
 *         color:      hsl(.5, .5, .5),
 *
 *         adjust: function() {
 *             // TODO here you can setup dynamic adjustment,
 *             //      e.g. when you want the marker to follow an entity
 *             //      or somehow react to the mix state.
 *         },
 *     })
 *
 *
 */

let id = 0

class CoordMarker {

    constructor(st) {
        augment(this, {
            id:   ++id,
            name: 'coordMarker' + id,
            x:     0,
            y:     0,
            r:     25,
            scale: 1,
            flipY: false,

            showDot:   false,
            showCross: true,
            showCoord: true,
            font:      '32px moon',
            color:     hsl(.5, .5, .5),
        }, st)
    }

    adjust() {}

    draw() {
        this.adjust() 
        const { x, y, r, flipY, color } = this

        save()
        translate(x, y)
        if (flipY) scale( this.scale, -this.scale )
        else scale( this.scale )

        if (this.showDot) {
            fill(color)
            block(0, 0, 4, 4)
        }
        if (this.showCross) {
            lineWidth(2)
            stroke(color)
            line(-r,  0, r, 0)
            line( 0, -r, 0, r)
        }
        if (this.showCoord) {
            baseTop()
            alignLeft()
            font(this.font)
            fill(color)
            text(`${x}:${y}`, 5, 5)
        }

        restore()
    }

}
