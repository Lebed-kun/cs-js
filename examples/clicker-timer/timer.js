import { Component, TextContent } from '../../core/component.js';

class Timer extends Component {
    constructor({ props = {}, root = null, template = null }) {
        super({ props : Object.assign({}, props, {
            time : new Date()
        }), root, template })
    }

    mounted() {
        this.timer = setInterval(() => {
            this.setProps({ time : new Date() })
        }, 100)
    }

    unmounted() {
        console.log('Previous timer id: ' + this.timer);
        clearInterval(this.timer);
    }
    
    getTime() {
        return this._props.time.toLocaleTimeString();
    }
    
    tree() {
        return {
            type : 'div',
            attrs : {
                style : 'font-style: italic;'
            },
            children : [new TextContent(this.getTime())]
        }
    }
}

export default Timer;