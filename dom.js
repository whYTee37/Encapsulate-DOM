window.dom = {
    create(string) {//用法：dom.create(`<div>hi</div>`)
        const container = document.createElement("template");//不能用div当容器；因为div不是所有标签都能容纳
        container.innerHTML = string.trim();//trim去掉string首尾空格，给用户进行优化；如若不加，则强制要求用户不能多打首空格
        return container.content.firstChild;
    },

    after(node, node2) {
        return node.after(node2); 
    },

    before(node2, node) {//在node前面增加一个node2：dom.before(x, test);
        return node.parentNode.insertBefore(node2, node);
    
    },

    append(parent,node) {//用于生成parent的一个孩子node
       return parent.appendChild(node);
    },

    wrap(node,parent) {//用parent把node包裹起来，即设置parent为node的父结点
        dom.before(parent, node);//先让parent成为node的兄弟（前后均可，这里取前）
        dom.append(parent, node);//append有清空的功效——node被append后，以前的兄弟node即消失
        return;
    },

    remove(node) {//删除单个结点
        return node.parentNode.removeChild(node);
        //node.remove();比较新，兼容性不稳定（？）
    },

    empty(node) {//删除node的所有子孙结点
        const array = [];
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },

    attr(node, name, value){ //设置node结点的name属性的值为value
        if(arguments.length === 3){//overload
          node.setAttribute(name, value)
        }else if(arguments.length === 2){//查询node结点的name的值
          return node.getAttribute(name)
        }
    },
    
    text(node, string){ //用于读、写文本内容
        if(arguments.length ===2 ){//将string写入node结点内
          if('innerText' in node){//适配原则。实际上innerText和textContent作用是一样的
            node.innerText = string 
          }else{
            node.textContent = string 
          }
        }else if(arguments.length === 1){//读
          if('innerText' in node){
            return node.innerText
          }else{
            return node.textContent
          }
        }
    },

    html(node, string){//用于读、写html内容
        if(arguments.length === 2){
          node.innerHTML = string
        }else if(arguments.length === 1){
          return node.innerHTML 
        }
    },

    style(node, name, value){
        if(arguments.length===3){
          // dom.style(div, 'color', 'red')
          node.style[name] = value
        }else if(arguments.length===2){
          if(typeof name === 'string'){
            // dom.style(div, 'color')
            return node.style[name]
          }else if(name instanceof Object){
            // dom.style(div, {color: 'red'})
            const object = name
            for(let key in object){
              node.style[key] = object[key]
            }
          }
        }
    },
    
    class: {
        add(node, className){//给node添加class
          node.classList.add(className)
        },
        remove(node, className){
          node.classList.remove(className)
        },
        has(node, className){
          return node.classList.contains(className)
        }
    },
    
    on(node, eventName, fn){//添加事件监听
        node.addEventListener(eventName, fn)
      },
      off(node, eventName, fn){//删除事件监听
        node.removeEventListener(eventName, fn)
    },
      
    find(selector, scope){//给了范围就返回scope.xxx，没给范围，单参数的情况下就返回document.xxx
        return (scope || document).querySelectorAll(selector)
    },
    
    parent(node){
        return node.parentNode
      },
      children(node){
        return node.children
      },
      siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n!==node)
    },
      
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){//当x是文本结点时，查找下一个
          x = x.nextSibling
        }
        return x
      },
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){//当x是文本结点时，查找上一个
          x = x.previousSibling
        }
        return x
    },
      
    each(nodeList, fn){
        for(let i=0;i<nodeList.length;i++){
          fn.call(null, nodeList[i])
        }
      },
    
}