import ToDoList from './todolist.js';
import Form from './form.js';

import { Component } from '../../core/component.js';

class App extends Component {
    constructor() {
        super({ hasElement : true })
    }
    
    tree() {
        return {
            type : 'div',
            children : {
                todos : new ToDoList(),
                form : new Form()
            }
        }
    }
}

export default App;