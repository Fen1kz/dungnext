let Promise = require('bluebird');

class StateManager {
    constructor(game) {
        this.game = game;
        this.states = {};
        this.status = 0;
    }

    add(name, State) {
        this.states[name] = new State(this.game);

        this.states[name].preload(PIXI.loader);

        return (PIXI.loader._numToLoad > 0
            ? new Promise((resolve, reject) => PIXI.loader.load(() => resolve(true)))
            : Promise.resolve(true));
    }

    loop(time) {
        this.game.emit('state.update');
        this.current.update(time);

        this.game.emit('state.render');
        this.game.renderer.render(this.current.stage);
    }

    start(name) {
        if (this.current) this.stop();

        this.current = this.states[name];

        this.current.$preCreate();
        this.game.stage = this.current.stage;
        this.current.create();

        PIXI.ticker.shared.add(this.loop, this);
        PIXI.ticker.shared.start();

        if (!this.game.renderer.plugins.interaction) {
            PIXI.ticker.shared.addOnce(() => {
                this.game.renderer.plugins.interaction = new PIXI.interaction.InteractionManager(this.game.renderer);
            });
        }
    }

    stop() {
        if (!this.current) throw 'stopping nothing';

        this.game.renderer.plugins.interaction.destroy();
        this.game.renderer.plugins.interaction = null;

        PIXI.ticker.shared.stop();
        PIXI.ticker.shared.remove(this.loop, this);

        this.current.stage.destroy(true);

        this.current = null;
    }

    destroy() {

    }
}

module.exports = StateManager;