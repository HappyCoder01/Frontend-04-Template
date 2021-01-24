function CubicBezier(p0, p1, p2, p3) {
    return function (t) {
        return p0 * Math.pow(1 - t, 3) + 3 * p1 * t * Math.pow(1 - t, 2) + 3 * p2 * Math.pow(t, 2) * (1 - t) + p3 * Math.pow(t, 3);
    };
}

export let liner = v => v;
export let ease = CubicBezier(0.25, 1, 0.25, 1);
export let easeIn = CubicBezier(0.42, 0, 1, 1);
export let easeOut = CubicBezier(0,0,0.58,1);
export let easeInOut = CubicBezier(0.42,0,0.58,1);