import {Component} from './framework'

export class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (let item of this.attributes.src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${item}')`;
            this.root.appendChild(child);
        }

        let position = 0
        this.root.addEventListener('mousedown', e => {
            console.log('mousedown');
            let children = this.root.children;
            let startX = e.clientX;
            let move = (e) => {
                let x = e.clientX - startX;
                let current = position - Math.round((x - x % 640) / 640);
                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    let child = children[pos];
                    child.style.transition = 'none';
                    child.style.transform = `translate(${-pos * 640 + offset * 640 + x % 640}px)`
                }
            };
            let up = (e) => {
                let x = e.clientX - startX;
                position = position - Math.round(x / 640);
                for (let offset of [0, -Math.sign(Math.round(x / 640) - x + 320 * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;
                    let child = children[pos];
                    child.style.transition = '';
                    child.style.transform = `translate(${-pos * 640 + offset * 640}px)`
                }
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        })
        /*let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;
            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = 'none';
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
            setTimeout(()=>{
                next.style.transition = '';
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${- nextIndex * 100}%)`;
                currentIndex = nextIndex;
            }, 16)
        }, 3000);*/

        return this.root;
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    }
}