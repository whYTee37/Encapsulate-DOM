let x = dom.create(`<div id="newDiv1">newCreateDiv1</div>`);
console.log(x);

dom.after(test, x);

let y = dom.create(`<div id="newDiv2">newCreateDiv2</div>`);
console.log(y);
dom.before(y, test);

let z = dom.create(`<div id="newDiv3">newCreateDiv3</div>`);
dom.append(test, z);

let p1 = dom.create(`<div id="wrapper"></div>`);
dom.wrap(test, p1);

dom.remove(y);

dom.empty(p1);

dom.attr(x, "title", "this is div1");
console.log(dom.attr(x, `title`));

dom.text(x, "这句话是我通过我的dom.text写入的内容");
console.log(dom.text(x));

let p2 = dom.create(`<div id="test2"></div>`);
dom.after(x, p2);
dom.html(p2, `<div id="newDiv4">我是通过dom.html插入进来的</div>`);
console.log(dom.html(p2));

dom.class.add(x, "ahah");
dom.class.add(x, "hoho");
dom.class.remove(x, "hoho");
console.log(dom.class.has(x, "ahah"), dom.class.has(x, "hoho"));

let fn = () => {
    console.log("我是点击之后才被触发的！");
}
dom.on(x, `click`, fn);
dom.off(x, `click`, fn);

console.log(dom.find(`#test2`)[0]);

console.log(dom.parent(x));
console.log(dom.children(p2)[0]);

let q1 = dom.create(`<div name="sib1"></div>`);
let q2 = dom.create(`<div name="sib2"></div>`);
let q3 = dom.create(`<div name="sib3"></div>`);
dom.append(p2, q1); dom.append(p2, q2); dom.append(p2, q3);
console.log(dom.siblings(dom.find("#newDiv4")[0]));

console.log(dom.next(x));
console.log(dom.previous(x));

let t = dom.find(`#test2`)[0];
let tempArr = dom.children(t);
dom.each(tempArr,(n)=>dom.style(n, 'color', 'red'))


