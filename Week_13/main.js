import {createElement} from './framework'
import {Carousel} from './carousel'
import {Timeline, Animation} from './animation'


let imgs = [
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-08014b6569f0553ae1cc461104b37734_180x120.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612862896&t=2353db716eb5bb3243b3b1570dc94cea',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1932229584,2271379770&fm=11&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1764563908,3606292499&fm=11&gp=0.jpg'
];
let a = <Carousel src={imgs}></Carousel>

// document.body.appendChild(a);
a.mountTo(document.body);

let tl = new Timeline();
window.tl = tl;
window.animation = new Animation({set a(v) {console.log(v)}}, 'a', 0, 100, 1000, null);
// tl.add(new Animation({}, 'a', 0, 100, 1000, null))
// tl.start();