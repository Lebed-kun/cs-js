import { Component, TextContent } from '../../core/component.js';
import HTMLComponent from '../../core/html_component.js';

class NotFoundPage extends Component {
    toComponent() {
        return new HTMLComponent({
            tag : 'div',
            attrs : {
                style : 'border: 2px solid pink;'
            },
            children : [
                new HTMLComponent({
                    tag : 'h1',
                    children : [new TextContent('Not Found')] 
                })
            ]
        })
    }
} 

export default NotFoundPage;