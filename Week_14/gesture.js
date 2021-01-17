let element = document.documentElement;
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
    start(event, context);
    let mouseMove = (e) => {
        if (buttonMap[e.buttons] !== undefined) {
            move(e, contextMap[`mouse${buttonMap[e.buttons]}`]);
        }
    }
    let mouseUp = (e) => {
        end(e, contextMap[`mouse${event.button}`]);
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
        start(touch, context);
    }
});
element.addEventListener('touchmove', e => {
    for (let touch of e.changedTouches) {
        move(touch, contextMap[touch.identifier]);
    }
});
element.addEventListener('touchend', e => {
    for (let touch of e.changedTouches) {
        end(touch, contextMap[touch.identifier]);
        delete contextMap[touch.identifier];
    }
});
element.addEventListener('touchcancel', e => {
    for (let touch of e.changedTouches) {
        cancel(touch, contextMap[touch.identifier]);
        delete contextMap[touch.identifier];
    }
});

let start = (point, context) => {
    // console.log('start', point.clientX, point.clientY);
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
        console.log('press');
    }, 500);
};
let move = (point, context) => {
    // console.log('move', point.clientX, point.clientY);
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isPan = true;
        context.isTap = false;
        context.isPress = false;
        console.log('panstart');
        clearTimeout(context.handler);
    }
    if (context.isPan) {
        console.log('pan', dx, dy);
    }

    context.points = context.points.filter(p => Date.now() - p.t < 500);
    context.points.push({
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    });
};
let end = (point, context) => {
    if (context.isTap) {
        clearTimeout(context.handler);
        // console.log('tap');
        dispatch('tap');
    }
    if (context.isPress) {
        console.log('pressend');
    }
    if (context.isPan) {
        console.log('panend');
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
        console.log('flick')
    } else {
        context.isFlick = false;
    }

    // console.log('end', point.clientX, point.clientY);
};
let cancel = (point, context) => {
    clearTimeout(context.handler);
    console.log('cancel', point.clientX, point.clientY);
};

function dispatch(type, properties) {
    let event = new Event(type);
    for (let key in properties) {
        event[key] = properties[key];
    }
    element.dispatchEvent(event);
}