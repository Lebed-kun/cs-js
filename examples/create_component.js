class Heading extends Component {
    tree() {
        return {
            type : 'h1',
            children : {
                text : this._props.text || ''
            }
        }
    }
}

class Link extends Component {
    tree() {
        return {
            type : 'a',
            attrs : {
                style : `color: ${this._props.color || 'inherit'}; display: block;`,
                href : this._props.url
            },
            children : {
                title : this._props.title || this._props.url
            }
        }
    }
}

class App extends Component {
    getHeading() {
        return new Heading({
            props : {
                text : 'Hello world!'
            }
        })
    }

    getLinks() {
        return [
            new Link({
                props : {
                    url : 'https://redexample.com',
                    title : 'Red link',
                    color : 'red'
                }
            }),
            new Link({
                props : {
                    url : 'https://greenexample.com',
                    title : 'Green link',
                    color : 'green'
                }
            }),
            new Link({
                props : {
                    url : 'https://purpleexample.com',
                    title : 'Purple link',
                    color : 'purple'
                }
            })
        ]
    }
    
    tree() {
        return {
            type : 'div',
            children : [this.getHeading()].concat(this.getLinks())
        }
    }
}

const app = new App({
    hasElement : true
});
const root = document.getElementById('root');
root.appendChild(app.getElement());
