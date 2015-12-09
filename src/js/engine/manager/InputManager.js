let keyboardjs = require('keyboardjs');

class InputManager {
    constructor(game) {
        this.game = game;
        this.keyboard = keyboardjs
    }

    setMouseUpDown(flag, target) {
        if (flag && !target.interactive) {
            target.interactive = true;
            target.buttonMode = true;

            target.mousedown = target.touchstart = (event) => {
                target.emit('mouse.down', event);
            };
            target.mouseup = target.mouseupoutside = target.touchend = target.touchendoutside = (event) => {
                target.emit('mouse.up', event);
            };
        } else if (!flag && target.interactive) {
            target.interactive = false;
            target.buttonMode = false;

            this.setMouseMove(false);

            target.removeAllListeners('mouse.down');
            target.removeAllListeners('mouse.up');
            target.mousedown = target.touchstart =
                target.mouseup = target.touchend =
                    target.mouseupoutside = target.touchendoutside = void 0;
        }
    }

    setMouseMove(flag, target) {
        if (flag) {
            target.mousemove = target.touchmove = (event) => {
                target.emit('mouse.move', event);
            };
        } else {
            target.removeAllListeners('mouse.move');
            target.mousemove = target.touchmove = void 0;
        }
    }

    clickable(target) {
        this.setMouseUpDown(true, target);
        target.on('mouse.down', () => {
            let clickFn = () => target.emit('mouse.click');
            target.once('mouse.up', clickFn);
            setTimeout(() => {
                target.removeListener('mouse.up', clickFn);
            }, 200)
        });
    }

    draggable(target, opts) {
        this.setMouseUpDown(true, target);
        target.on('mouse.down', (startEvent) => {
            this.setMouseMove(true, target);
            let origin = target.position.clone();
            let offset = startEvent.data.global.clone();
            target.on('mouse.move', (moveEvent) => {
                target.x = origin.x + moveEvent.data.global.x - offset.x;
                target.y = origin.y + moveEvent.data.global.y - offset.y;
            });
            target.once('mouse.up', () => {
                this.setMouseMove(false, target);
            });
        });
    }

    destroy() {
        this.game = void 0;
        this.keyboard = void 0;
    }
}

module.exports = InputManager;