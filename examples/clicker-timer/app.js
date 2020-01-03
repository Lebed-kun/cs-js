import Timer from './timer.js';
import Clicker from './clicker.js';
import { Component } from '../../core/component.js';

class App extends Component {
    tree() {
        return {
            type : 'div',
            children : [
                new Timer({}),
                new Clicker({})
            ]
        }
    }
}

const app = new App({
    root : document.getElementById('root')
})