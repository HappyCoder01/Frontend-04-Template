import {Component, STATE, ATTRIBUTE} from './framework';
import {enableGesture} from './gesture';
import {Timeline, Animation} from './animation';
import {liner} from './ease';
export {STATE, ATTRIBUTE} from './framework'

export class Carousel extends Component {
    constructor() {
        super();
    }

    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (let item of this[ATTRIBUTE].src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${item.img}')`;
            this.root.appendChild(child);
        }
        enableGesture(this.root);
        let timeLine = new Timeline();
        timeLine.start();

        let children = this.root.children;
        this[STATE].position = 0;
        let handler = null;
        let t = 0;
        let ax = 0;

        this.root.addEventListener('start', e => {
            timeLine.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / 500;
            ax = liner(progress) * 640 - 640;
        });

        this.root.addEventListener('tap', e => {
            this.triggerEvent('click', {
                position: this[STATE].position,
                data: this[ATTRIBUTE].src[this[STATE].position]
            });
        });

        this.root.addEventListener('pan', e => {
            let x = e.clientX - e.startX - ax;
            let current = this[STATE].position - Math.round((x - x % 640) / 640);
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                let child = children[pos];
                child.style.transition = 'none';
                child.style.transform = `translate(${-pos * 640 + offset * 640 + x % 640}px)`
            }
        });

        this.root.addEventListener('end', e => {
            timeLine.reset();
            timeLine.start();
            handler = setInterval(nextPicture, 3000);

            let x = e.clientX - e.startX - ax;
            let current = this[STATE].position - ((x - x % 640) / 640);
            let direction = Math.round((x % 640) / 640);

            if (e.isFlick) {
                if (e.velocity < 0) {
                    direction  = Math.ceil((x % 640) / 640);
                } else {
                    direction  = Math.floor((x % 640) / 640);
                }
            }
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                let child = children[pos];
                child.style.transition = 'none';
                timeLine.add(new Animation(child.style, 'transform',
                    -pos * 640 + offset * 640 + x % 640,
                    -pos * 640 + offset * 640 + direction * 640,
                    500, 0, liner, v => `translateX(${v}px)`));
            }

            this[STATE].position = this[STATE].position - ((x - x % 640) / 640) - direction;
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
            this.triggerEvent('change', {position: this[STATE].position});
        });

        let nextPicture = () => {
            let children = this.root.children;
            let nextIndex = (this[STATE].position + 1) % children.length;
            let current = children[this[STATE].position];
            let next = children[nextIndex];

            t = Date.now();
            timeLine.add(new Animation(current.style, 'transform',
                -this[STATE].position * 640, -640 - this[STATE].position * 640, 500, 0, liner, v => `translateX(${v}px)`));
            timeLine.add(new Animation(next.style, 'transform',
                640 - nextIndex * 640, -nextIndex * 640, 500, 0, liner, v => `translateX(${v}px)`));
            this[STATE].position = nextIndex;
            this.triggerEvent('change', {position: this[STATE].position});
        };
        handler = setInterval(nextPicture, 3000);

        return this.root;
    }
}