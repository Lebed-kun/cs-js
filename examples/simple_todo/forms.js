class Input extends Component {
    handleChange(e) {
        const name = e.currentTarget.getAttribute('name');
        const value = e.currentTarget.value;

        this._props.form.setValue(name, value);
    }

    tree() {
        return {
            type : 'input',
            attrs : {
                name : this._props.name,
                placeholder : this._props.placeholder || '', 
                style : 'display: block;'
            },
            listeners : {
                change : this.handleChange.bind(this)
            }
        }
    }
}

class TextArea extends Input {
    tree() {
        return {
            type : 'textarea',
            attrs : {
                name : this._props.name,
                placeholder : this._props.placeholder || '', 
                style : 'display: block; resize: vertical;'
            },
            listeners : {
                change : this.handleChange.bind(this)
            }
        }
    }
}