export function createElement(type, attributes, ...children) {
    let element;
    if (typeof type === "string")
        element = new ElementWrapper(type);
    else
        element = new type;

    for (let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }

    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child);
        }
        child.mountTo(element);
        // element.appendChild(child);
    }
    return element;
}

export class Component {
    constructor() {
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(child) {
        this.root.appendChild(child);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class ElementWrapper extends Component{
    constructor(type) {
        super();
        this.type = type;
    }
    render() {
        return document.createElement(this.type);
    }
}

class TextWrapper extends Component{
    constructor(content) {
        super();
        this.content = content;
    }
    render () {
        return document.createTextNode(this.content);
    }
}