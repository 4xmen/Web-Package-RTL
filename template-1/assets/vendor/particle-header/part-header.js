let ParticleEngine = (function() {
    'use strict'

    function ParticleEngine(canvas_id) {
        // enforces new
        if (!(this instanceof ParticleEngine)) return new ParticleEngine(args)


        /**
         * ==============================
         *     Set Canvas & Stage
         * ==============================
         */

        this.canvas_id = canvas_id
        this.stage  = new createjs.Stage(canvas_id)
        this.canvas = document.getElementById(canvas_id)
        this.totalWidth  = this.canvasWidth  = this.canvas.width  = this.canvas.offsetWidth
        this.totalHeight = this.canvasHeight = this.canvas.height = this.canvas.offsetHeight


        /**
         * ==========================================================================
         *                        CREATE PARTICLE SETTINGS
         *
         *  - particles are placed near canvas center OR randomly across the canvas
         *    according to a percentage chance
         *
         *  - if a particle is assigned to the center, it's range of motion
         *    is tightly restricted to maintain particle density
         *
         *  - higher chance of x-axis centralization causes a more vertical particle
         *    dispersion
         *
         *  - higher chance of y-axis centralization causes more horizontal particle
         *    dispersion
         *
         * ==========================================================================
         */


        this.particleArray = []

        this.xCentralizedChance = .6
        this.yCentralizedChance = .8

        this.centralizedParticleRange = {
            x: {
                setMinPosition: (baseXCoordinate) => baseXCoordinate + ((this.totalWidth - baseXCoordinate) / 4),
                setMaxPosition: (baseXCoordinate) => baseXCoordinate + ((this.totalWidth - baseXCoordinate) * .75),
            },

            y: {
                setMinPosition: (areaHeight) => this.totalHeight * (2 - (areaHeight / 2)) / 4,
                setMaxPosition: (areaHeight) => this.totalHeight * (2 + (areaHeight / 2)) / 4,
            }
        }


        this.particleTypes = [
            /* many small, hollow particles */
            {
                forParticleInstance: {
                    yMovementRange: this.totalHeight,
                    xMovementRange: this.totalWidth,
                    particleColor: "#d4181a",
                    baseXCoordinate: 0,
                    baseYCoordinate: 0,
                    travelDistance: 20,
                    particleWidth: 3,
                    areaHeight: 1.5,
                    alphaMax: 0.4,
                    blur: false,
                },
                particleCount: 500,
                id: "small",
            },

            /* several medium, blured particles */
            {
                forParticleInstance: {
                    yMovementRange: this.totalHeight,
                    xMovementRange: this.totalWidth,
                    particleColor: "#8B0000",
                    travelDistance: 16,
                    baseXCoordinate: 0,
                    baseYCoordinate: 0,
                    particleWidth: 8,
                    areaHeight: 3,
                    alphaMax: 0.3,
                    blur: true,
                },
                particleCount: 300,
                id: "medium",
            },

            /* a few large, blured particles */
            {
                forParticleInstance: {
                    yMovementRange: this.totalHeight,
                    xMovementRange: this.totalWidth,
                    particleColor: "#ff0000",
                    travelDistance: 60,
                    baseXCoordinate: 0,
                    baseYCoordinate: 0,
                    particleWidth: 30,
                    areaHeight: 1,
                    alphaMax: 0.2,
                    blur: true,
                },
                particleCount: 10,
                id: "large",
            }
        ]


        /**
         * ============================================================ *
         *                         makeParticles
         *
         * - uses the below particle methods to fully instantiate &
         *.  configure the particles
         * ============================================================ *
         */


        this.makeParticles = function() {
            this.particleTypes.forEach(particleType => {
                const {
                    id,
                    particleCount,
                    forParticleInstance,
                } = particleType

                for (let i = 0; i < particleCount; i++ ){
                    let particle = new createjs.Shape()
                    this.addStaticProperties(particle, forParticleInstance, id)
                    this.addRandomizedProperties(particle)
                    this.drawParticle(particle)
                    this.setInitialParticlePosition(particle)
                    this.stage.addChild(particle)
                    animateParticle(particle)
                    this.particleArray.push(particle)
                }
            })
        }


        /**
         * ==============================================
         *        particle configuration methods
         * ==============================================
         */


        this.addStaticProperties = function(particle, forParticleInstance, id) {
            particle.flag = id
            for (let key in forParticleInstance) {
                particle[key] = forParticleInstance[key]
            }
        }


        this.addRandomizedProperties = function(particle) {
            particle.scaleX = particle.scaleY = randomizeWithinRange(0.3, 1)
            particle.alpha = randomizeWithinRange(0, 0.1)
            particle.speed = randomizeWithinRange(2, 10)
        }


        this.drawParticle = function(particle) {
            const { blur, particleColor, particleWidth } = particle
            particle.graphics.beginFill(particleColor).drawCircle(0, 0, particleWidth)
            blur ? this.drawBlurredParticle(particle) : this.drawClearParticle(particle)
        }


        this.drawBlurredParticle = function(particle) {
            const { particleWidth, particleColor} = particle
            let blurFilter = new createjs.BlurFilter(particleWidth / 2, particleWidth / 2, 1)
            particle.filters = [blurFilter]
            let bounds = blurFilter.getBounds()
            particle.graphics.beginStroke(particleColor).setStrokeStyle(1).drawCircle(0, 0, particleWidth);
            particle.cache(-50+bounds.x, -50+bounds.y, 100+bounds.width, 100+bounds.height)
        }


        this.drawClearParticle = function(particle) {
            const { particleWidth, particleColor } = particle
            particle.graphics.beginStroke(particleColor).setStrokeStyle(1).drawCircle(0, 0, particleWidth);
        }


        this.setCentralCoordinate = function(axis, base) {
            const { setMinPosition, setMaxPosition } = this.centralizedParticleRange[axis]
            const minPosition = setMinPosition(base)
            const maxPosition = setMaxPosition(base)
            return randomizeWithinRange(minPosition, maxPosition)
        }


        this.setInitialParticlePosition = function(particle) {

            const {
                baseXCoordinate,
                baseYCoordinate,
                xMovementRange,
                yMovementRange,
                areaHeight,
            } = particle

            const args = [baseXCoordinate, xMovementRange, baseYCoordinate, yMovementRange, areaHeight]
            args.forEach(arg => setZeroIfFalsey(arg))

            const xNearCenter = Math.random() <= this.xCentralizedChance
            const yNearCenter = Math.random() <= this.yCentralizedChance

            particle.initX = particle.x = xNearCenter ?
                this.setCentralCoordinate("x", baseXCoordinate) :
                randomizeWithinRange(baseXCoordinate, xMovementRange)

            particle.initY = particle.y = yNearCenter ?
                this.setCentralCoordinate("y", areaHeight) :
                randomizeWithinRange(baseYCoordinate, yMovementRange)
        }

        /**
         * ==============================================
         *            Particle Animations
         *
         *  Each particle endlessly cycles between
         *  the "animateParticle" and "fadeout" animations
         * ==============================================
         */

        const animateParticle = function(particle) {
            const { speed, initX, initY, travelDistance, alphaMax } = particle
            let endScale = randomizeWithinRange(0.3, 1);
            let xDestination = randomizeWithinRange(initX - travelDistance, initX + travelDistance)
            let yDestination = randomizeWithinRange(initY - travelDistance, initY + travelDistance)
            const greaterAlpha = randomizeWithinRange(0.1, alphaMax)

            const firstEndState = {
                scaleX: endScale,
                scaleY: endScale,
                x: xDestination,
                y: yDestination,
                ease: Cubic.easeInOut,
                onComplete: fadeout,
                onCompleteParams:[particle, speed],
                alpha: greaterAlpha,
            }
            TweenMax.to(particle, speed, {...firstEndState})
        }


        function fadeout(particle, speed) {
            particle.speed = randomizeWithinRange(2, 10)
            const endState = {
                alpha: 0,
                onComplete: animateParticle,
                onCompleteParams:[particle],
            }
            TweenMax.to(particle, speed / 2, endState)
        }

        /**
         * =========================================
         *            Render & Resize
         * =========================================
         */

        this.render = function() {
            this.stage.update()
        }

        this.resize = function() {
            this.totalWidth  = this.canvasWidth  = this.canvas.width = this.canvas.offsetWidth
            this.totalHeight = this.canvasHeight = this.canvas.height = this.canvas.offsetHeight
            this.render()
            this.particleArray.forEach(particle => this.setInitialParticlePosition(particle))
        }

        this.makeParticles()
    }
    return ParticleEngine
}());


/**
 *                      HELPERS
 * =======================================================
 */

const randomizeWithinRange = (min, max) => min + ((max - min) * Math.random())


const setZeroIfFalsey = (variable) => !variable && (variable = 0)


/**
 * =======================================================
 *                      RUN CODE
 * =======================================================
 */

let particles
(() => {
    particles = new ParticleEngine('projector')
    createjs.Ticker.addEventListener("tick", updateCanvas)
    window.addEventListener('resize', resizeCanvas)
    function updateCanvas(){particles.render()}
    function resizeCanvas(){particles.resize()}
})()