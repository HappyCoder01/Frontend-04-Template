let element = document.documentElement;


// listen => recognize => dispatch
// new Listener(new Recognizer(dispatch))

export class Listener {
    constructor(element, recognizer) {
        let contextMap = Object.create(null);
        // event.buttons event.button 的map关系，因为mousemove无法拿到event.button
        let buttonMap = {
            1: 0,
            4: 1,
            2: 2
        };
        let supportTouchStart = false;

        element.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
        element.addEventListener('mousedown', event => {
            if (supportTouchStart) {
                return;
            }
            let context = Object.create(null);
            contextMap[`mouse${event.button}`] = context;
            recognizer.start(event, context);
            let mouseMove = (e) => {
                if (buttonMap[e.buttons] !== undefined) {
                    recognizer.move(e, contextMap[`mouse${buttonMap[e.buttons]}`]);
                }
            }
            let mouseUp = (e) => {
                recognizer.end(e, contextMap[`mouse${event.button}`]);
                delete contextMap[`mouse${event.button}`];
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);
            };
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        })

        element.addEventListener('touchstart', e => {
            supportTouchStart = true;
            for (let touch of e.changedTouches) {
                let context = Object.create(null);
                contextMap[touch.identifier] = context;
                recognizer.start(touch, context);
            }
        });
        element.addEventListener('touchmove', e => {
            for (let touch of e.changedTouches) {
                recognizer.move(touch, contextMap[touch.identifier]);
            }
        });
        element.addEventListener('touchend', e => {
            for (let touch of e.changedTouches) {
                recognizer.end(touch, contextMap[touch.identifier]);
                delete contextMap[touch.identifier];
            }
        });
        element.addEventListener('touchcancel', e => {
            for (let touch of e.changedTouches) {
                recognizer.cancel(touch, contextMap[touch.identifier]);
                delete contextMap[touch.identifier];
            }
        });
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    start(point, context) {
        this.dispatcher.dispatch('start', {
            clientX: point.clientX,
            clientY: point.clientY
        });
        context.isPan = false;
        context.isTap = true;
        context.isPress = false;
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];
        context.handler = setTimeout(() => {
            context.isPan = false;
            context.isTap = false;
            context.isPress = true;
            context.handler = null;
            this.dispatcher.dispatch('press', {});
        }, 500);
    }

    move(point, context) {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        context.isVertical = Math.abs(dx) < Math.abs(dy);
        let params = {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            isVertical: context.isVertical
        };
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isPan = true;
            context.isTap = false;
            context.isPress = false;
            this.dispatcher.dispatch('panstart', params);
            clearTimeout(context.handler);
        }
        if (context.isPan) {
            this.dispatcher.dispatch('pan', params);
        }

        context.points = context.points.filter(p => Date.now() - p.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        });
    }

    end(point, context) {
        if (context.isTap) {
            clearTimeout(context.handler);
            this.dispatcher.dispatch('tap');
        }
        if (context.isPress) {
            this.dispatcher.dispatch('pressend');
        }

        context.points = context.points.filter(p => Date.now() - p.t < 500);
        let d, v;
        if (!context.points.length) {
            v = 0;
        } else {
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2
                + (point.clientY - context.points[0].y));
            v = d / (Date.now() - context.points[0].t);
        }

        if (v > 1.5) {
            context.isFlick = true;
            this.dispatcher.dispatch('flick', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            })
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            });
        }

        this.dispatcher.dispatch('end', {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            isVertical: context.isVertical,
            isFlick: context.isFlick,
            velocity: v
        });
    }

    cancel(point, context) {
        clearTimeout(context.handler);
        this.dispatcher.dispatch('cancel');
    }
}

export class Dispatcher {
    constructor(element) {
        this.element = element;
    }

    dispatch(type, properties) {
        let event = new Event(type);
        for (let key in properties) {
            event[key] = properties[key];
        }
        this.element.dispatchEvent(event);
    }
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
}