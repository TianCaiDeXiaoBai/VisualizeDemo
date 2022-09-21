/*
 * @Author: wujian
 * @Date: 2022-08-26 13:39:21
 * @LastEditors: wujian
 * @LastEditTime: 2022-08-29 15:25:56
 * @FilePath: \3d_case\cases\src\utils\canvasEngine.js
 * @Description: 
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved. 
 */
export class canvasEngine {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')
    }
    /**
     * @author: wujian
     * @description: 画虚线
     * @param {*} color
     * @param {*} lineWidth
     * @param {*} lineLong1
     * @param {*} lineLong2
     * @param {*} x
     * @param {*} y
     * @param {*} w
     * @param {*} h
     * @return {*}
     */
    drawDash({ color, lineWidth, lineLong1, lineLong2, offset, x, y, w, h }) {
        this.ctx.lineWidth = lineWidth
        this.ctx.strokeStyle = color
        // 设置虚线
        this.ctx.setLineDash([lineLong1, lineLong2])
        this.ctx.lineDashOffset = - offset;
        this.ctx.strokeRect(x, y, w, h)
        this.ctx.setLineDash([0, 0])
    }

    /**
     * @author: wujian
     * @description: 画图片
     * @param {*} src
     * @param {*} x
     * @param {*} y
     * @param {*} w
     * @param {*} h
     * @return {*}
     */
    drawImg(src, { x, y, w, h }) {
        var img = new Image()
        img.src = src
        const ctx = this.ctx
        img.onload = function () {
            ctx.drawImage(img, x, y, w, h)
        }
        // ctx.fillRect(x, y, w, h)
    }
    /**
     * @author: wujian
     * @description: 写文字
     * @param {*} font
     * @param {*} color
     * @param {*} text
     * @param {*} x
     * @param {*} y
     * @return {*}
     */
    drawText({ font, color, text, x, y, textAlign }) {
        this.ctx.font = font
        this.ctx.fillStyle = color
        this.ctx.textAlign = textAlign
        this.ctx.fillText(text, x, y)
    }
    /**
     * @author: wujian
     * @description: 画圆角框
     * @param {*} x
     * @param {*} y
     * @param {*} w
     * @param {*} h
     * @param {*} r
     * @return {*}
     */
    drawRoundRect(x, y, w, h, r) {
        if (w < 2 * r) { r = w / 2; }
        if (h < 2 * r) { r = h / 2; }
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arcTo(x + w, y, x + w, y + h, r);
        this.ctx.arcTo(x + w, y + h, x, y + h, r);
        this.ctx.arcTo(x, y + h, x, y, r);
        this.ctx.arcTo(x, y, x + w, y, r);
        this.ctx.fill();
    }
    /**
    * @author: wujian
    * @description: 画圆角框
    * @param {*} x
    * @param {*} y
    * @param {*} w
    * @param {*} h
    * @param {*} r
    * @return {*}
    */
    drawRoundRectStroke(x, y, w, h, r) {
        if (w < 2 * r) { r = w / 2; }
        if (h < 2 * r) { r = h / 2; }
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arcTo(x + w, y, x + w, y + h, r);
        this.ctx.arcTo(x + w, y + h, x, y + h, r);
        this.ctx.arcTo(x, y + h, x, y, r);
        this.ctx.arcTo(x, y, x + w, y, r);
        this.ctx.stroke();
    }

    /**
     * @author: wujian
     * @description: 清除
     * @return {*}
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export class Wcanvas extends canvasEngine {
    constructor(id) {
        super(id)
    }
    /**
     * @author: wujian
     * @description: 
     * @param {*} watherLevel
     * @param {*} color
     * @param {*} x
     * @param {*} y
     * @param {*} w
     * @param {*} h
     * @return {*}
     */
    drawWatherTower(waterLevel, { waterStartColor, waterStopColor, towerColor, towerBgColor, x, y, w, h }) {
        // 画水
        let gradientPoint1 = {
            x,
            y
        }
        let gradientPoint2 = {
            x: x,
            y: y + h
        }
        let linearGradient = this.ctx.createLinearGradient(gradientPoint1.x, gradientPoint1.y, gradientPoint2.x, gradientPoint2.y)
        linearGradient.addColorStop(0, waterStartColor)
        linearGradient.addColorStop(1, waterStopColor)
        this.ctx.fillStyle = linearGradient
        this.ctx.fillRect(x, y + waterLevel, w, h - waterLevel)
        // 画水塔
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = towerColor
        this.ctx.fillStyle = towerBgColor
        this.drawRoundRectStroke(x, y, w, h + 20, 4)
        this.drawRoundRect(x, y, w, h + 20, 4)
        // 底座
        this.ctx.beginPath()
        this.ctx.moveTo(x, y + h + 10)
        this.ctx.lineTo(x + w, y + h + 10)
        this.ctx.stroke()
        // 画腿
        const drawLeg = (points) => {
            this.ctx.beginPath()
            points.map((point, idx) => {

                if (idx == 0) {
                    this.ctx.moveTo(point.x, point.y)
                } else {
                    this.ctx.lineTo(point.x, point.y)
                }

            })


            this.ctx.closePath()
            this.ctx.stroke()
            this.ctx.fill()
        }
        const legWidth = w / 16
        const legheight = h / 3
        let legPoints = []
        legPoints.push([{ x: x + w / 8, y: y + h + 20 }, { x: x + w / 8 + legWidth, y: y + h + 20 }, { x: x + w / 16, y: y + h + 20 + legheight }, { x: x, y: y + h + 20 + legheight }])
        legPoints.push([{ x: x + w / 4, y: y + h + 20 }, { x: x + w / 4 + legWidth, y: y + h + 20 }, { x: x + w / 16 + w / 8, y: y + h + 10 + legheight }, { x: x + w / 4 - w / 16 - legWidth, y: y + h + 10 + legheight }])
        legPoints.push([{ x: x + w - w / 8 - legWidth, y: y + h + 20 }, { x: x + w - w / 8, y: y + h + 20 }, { x: x + w, y: y + h + 20 + legheight }, { x: x + w - legWidth, y: y + h + 20 + legheight }])
        legPoints.push([{ x: x + w - w / 4 - legWidth, y: y + h + 20 }, { x: x + w - w / 4, y: y + h + 20 }, { x: x + w - w / 8, y: y + h + 10 + legheight }, { x: x + w - legWidth - w / 8, y: y + h + 10 + legheight }])
        legPoints.forEach(legPoint => {
            drawLeg(legPoint)
        })

    }

    /**
     * @author: wujian
     * @description: 画文字面板
     * @param {*} panel
     * @param {*} labels
     * @return {*}
     */
    drawLabelPanel(panel, labels) {
        this.drawPanel(panel)
        labels.map(label => {
            this.drawText(label)
        })
    }
    /**
     * @author: wujian
     * @description: 画面板
     * @param {*} x
     * @param {*} y
     * @param {*} w
     * @param {*} h
     * @param {*} r
     * @param {*} color
     * @return {*}
     */
    drawPanel({ x, y, w, h, r, color }) {
        this.ctx.fillStyle = color
        this.drawRoundRect(x, y, w, h, r)
    }

    /**
     * @author: wujian
     * @description: 创建管道
     * @return {*}
     */
    drawPipe({ pipeColor, lineColor, lineLong1, lineLong2, pipeWidth, lineWidth, offset }, points) {
        // 画管道
        this.ctx.strokeStyle = pipeColor
        this.ctx.lineWidth = pipeWidth
        this.ctx.beginPath()
        points.map((point, idx) => {
            if (idx == 0) {
                this.ctx.moveTo(point.x, point.y)
            } else {
                this.ctx.lineTo(point.x, point.y)
            }
        })
        this.ctx.stroke()
        this.ctx.beginPath()
        // 设置虚线
        points.map((point, idx) => {
            if (idx == 0) {
                this.ctx.moveTo(point.x, point.y)
            } else {
                this.ctx.lineTo(point.x, point.y)
            }
        })

        this.ctx.lineWidth = lineWidth
        this.ctx.strokeStyle = lineColor
        this.ctx.setLineDash([lineLong1, lineLong2])
        this.ctx.lineDashOffset = - offset;
        this.ctx.stroke()
        this.ctx.setLineDash([0, 0])
    }
    /**
     * @author: wujian
     * @description: 边框
     * @return {*}
     */
    drawBorder() {
        this.ctx.strokeStyle = 'rgba(46,50,63,1)'
        this.ctx.lineWidth = 10
        this.drawRoundRectStroke(80, 40, 3680, 2080, 16)
    }
    /**
     * @author: wujian
     * @description: 边框
     * @return {*}
     */
    drawTitle(textConfig) {
        const titleWdith = 880
        const screenWidth = 3840
        const titleHeight = 80
        this.ctx.fillStyle = 'rgba(0, 105, 168, 0.3)'
        const paths = []
        paths.push({
            x: (screenWidth - titleWdith) / 2,
            y: 40
        })
        paths.push({
            x: (screenWidth + titleWdith) / 2,
            y: 40
        })
        paths.push({
            x: (screenWidth + titleWdith) / 2 - 80,
            y: 40 + titleHeight
        })
        paths.push({
            x: (screenWidth - titleWdith) / 2 + 80,
            y: 40 + titleHeight
        })

        this.ctx.beginPath()
        paths.forEach((point, idx) => {
            if (idx == 0) {
                this.ctx.moveTo(point.x, point.y)
            } else {
                this.ctx.lineTo(point.x, point.y)
            }
        })
        this.ctx.closePath()
        this.ctx.fill()
        Object.assign(textConfig, {
            x: (screenWidth) / 2,
            y: 92,
            font: "bold 48px Arial",
            textAlign: 'center'
        })
        this.drawText(textConfig);
    }
}

