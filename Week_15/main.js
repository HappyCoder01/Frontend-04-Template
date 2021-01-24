// import {createElement} from './framework'
// import {Carousel} from './Carousel'
// import {Timeline, Animation} from './animation'


// let imgs = [
//     {
//         img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-08014b6569f0553ae1cc461104b37734_180x120.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612862896&t=2353db716eb5bb3243b3b1570dc94cea',
//         url: 'https://www.baidu.com'
//     },
//     {
//         img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1932229584,2271379770&fm=11&gp=0.jpg',
//         url: 'http://lookdiv.com/'
//     },
//     {
//         img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1764563908,3606292499&fm=11&gp=0.jpg',
//         url: 'https://time.geekbang.org/'
//     }
// ];
// let a = <Carousel src={imgs}
//                   onChange = {e => console.log(e.detail.position)}
//                   onClick = {e => location.href = e.detail.data.url}
// >
// </Carousel>
//
// // document.body.appendChild(a);
// a.mountTo(document.body);

// import {createElement} from './framework'
// import {Button} from "./Button";
//
// let a = <Button>content</Button>;
// a.mountTo(document.body);

import {createElement} from './framework'
import {List} from "./List";

let imgs = [
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-08014b6569f0553ae1cc461104b37734_180x120.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612862896&t=2353db716eb5bb3243b3b1570dc94cea',
        url: 'https://www.baidu.com',
        title: '111'
    },
    {
        img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1932229584,2271379770&fm=11&gp=0.jpg',
        url: 'http://lookdiv.com/',
        title: '222'
    },
    {
        img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1764563908,3606292499&fm=11&gp=0.jpg',
        url: 'https://time.geekbang.org/',
        title: '333'
    }
];
let a = <List data={imgs}>
    {
        (record) => {
            return <div>
                <img src={record.img}/>
                <a href={record.url}>{record.title}</a>
            </div>
        }
    }
</List>;
a.mountTo(document.body);
