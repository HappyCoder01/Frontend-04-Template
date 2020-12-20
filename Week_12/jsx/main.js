function createElement(type, attributes, ...children) {
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

class Div {
    constructor() {
        this.root = document.createElement('div');
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

class ElementWrapper{
    constructor(type) {
        this.root = document.createElement(type);
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

class TextWrapper{
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

let a = <Div id={'test'}>
    <span>1</span>
    <span className={'span2'}>2</span>
    <span style={'color: red'}>3</span>
</Div>

// document.body.appendChild(a);
a.mountTo(document.body);