import { Component, TextContent } from '../../core/component.js';
import HTMLComponent from '../../core/html_component.js';

class HomePage extends Component {
    toComponent() {
        return new HTMLComponent({
            tag : 'div',
            attrs : {
                style : 'border: 2px solid pink;'
            },
            children : [
                new HTMLComponent({
                    tag : 'h1',
                    children : [new TextContent('Hello World :3')]
                }),
                new HTMLComponent({
                    tag : 'p',
                    attrs : {
                        style : 'border-top: 1px solid gray;'
                    },
                    children : [new TextContent('This is router example.')] 
                })
            ]
        })
    }
} 

export default HomePage;