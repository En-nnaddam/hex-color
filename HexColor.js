class HexColor {
    constructor(color) {
        if (typeof color === 'string') {
            this.color = color;
            this.rgb = this.toRGB()
        } else if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
            this.rgb = color
            this.color = this.toHex()
        } else {
            this.color = '#000000'
            this.rgb = { r: 0, g: 0, b: 0 }
        }
    }

    getCode() {
        return this.color.replace('#', '')
    }


    isValidate() {
        const colorCode = this.getCode()
        return (colorCode.length === 6 || colorCode.length === 3)
    }

    toRGB() {
        const colorCode = this.getCode()

        return {
            r: parseInt(colorCode[0], 16) * 16 + parseInt(colorCode[1], 16),
            g: parseInt(colorCode[2], 16) * 16 + parseInt(colorCode[3], 16),
            b: parseInt(colorCode[4], 16) * 16 + parseInt(colorCode[5], 16)
        }
    }

    toHex() {
        const { r, g, b } = this.rgb

        let red = r.toString(16)
        let green = g.toString(16)
        let blue = b.toString(16)

        if (red.length < 2) red = `0${red}`
        if (green.length < 2) green = `0${green}`
        if (blue.length < 2) blue = `0${blue}`

        return `#${red}${green}${blue}`
    }

    add(value) {
        if (value === 0) return this

        const rgb = this.rgb

        if (value > 0) {
            rgb.r = rgb.r + value < 255 ? rgb.r + value : 255
            rgb.g = rgb.g + value < 255 ? rgb.g + value : 255
            rgb.b = rgb.b + value < 255 ? rgb.b + value : 255
        } else {
            rgb.r = rgb.r + value > 0 ? rgb.r + value : 0
            rgb.g = rgb.g + value > 0 ? rgb.g + value : 0
            rgb.b = rgb.b + value > 0 ? rgb.b + value : 0
        }

        return new HexColor({
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
        })
    }

    lighten(percentage = 10) {
        if (percentage > 100) percentage = 100
        else if (percentage < -100) percentage = -100

        const value = Math.floor(percentage * 255 / 100)

        return this.add(value)
    }
}

module.exports = HexColor