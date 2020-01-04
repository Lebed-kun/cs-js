import { Component, TextContent } from '../../core/component.js';
import HTMLComponent from '../../core/html_component.js';

class DynamicPage extends Component {
    toComponent() {
        const { name } = this._props.path;
        const { q } = this._props.query || '';

        if (!name) {
            const router = this._props.router;
            router.redirect('/404');
        }
        
        return new HTMLComponent({
            tag : 'div',
            attrs : {
                style : 'border: 2px solid pink;'
            },
            children : [
                new HTMLComponent({
                    tag : 'h1',
                    children : [new TextContent(`Hello, ${name}!`)]
                }),
                new HTMLComponent({
                    tag : 'p',
                    attrs : {
                        style : 'border-top: 1px solid gray;'
                    },
                    children : [new TextContent(q || '')] 
                })
            ]
        })
    }
} 

export default DynamicPage;