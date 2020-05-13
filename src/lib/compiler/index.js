import {Watcher} from "../watcher/watcher";

function Compiler(vm) {
    if(!(this instanceof Compiler)) {
        throw new Error("should be a new Compiler")
    }
    this.init(vm);
}
Compiler.prototype.init = function(vm) {
    this._vm = vm;
    this._el = query(this._vm.$options.el);
    let fragment = nodeToFragment(this._el);
    compile.call(this,fragment);
    this._el.appendChild(fragment);
};
//核心函数
function nodeToFragment(el) {
    let fragment = document.createDocumentFragment();
    let nodes = el.childNodes;

    while(nodes.length) {
        fragment.appendChild(nodes[0]);
    }
    return fragment;
}
function compile(fragment) {
    let nodes = fragment.childNodes;
    for(let node of nodes) {
        if(node.nodeType === 1) {
            //元素节点
            compile.call(this,node);
            resolveDirective(node,this._vm);
            //处理节点
        } else {
            //文本节点
            if(node.textContent.trim() !== '') {
                updater.compileText(node.textContent,node,this._vm);
            }

        }

    }
}
function resolveDirective(node,vm) {
    let attrs = [].slice.call(node.attributes);
    for(let item of attrs) {
        let attrName = item.name;
        let attrVal = item.value;
        if(attrName.includes('LJ-')) {

                //区分出是指令
                updater.compileElement(attrName.split('-')[1],attrVal,node,vm);


        }
    }
}
let updater = {
    compileElement(directiveName,expr,node,vm) {

        if(directiveName.trim().startsWith('on')) {
            this.update['on'](node,directiveName.split(':')[1],expr,vm)
        } else {

            let val = getVal(expr,vm.$options.data,(val)=>{
                this.update[directiveName](node,val);
            });
            this.update[directiveName](node,val,expr,vm);
        }

    },
    compileText(expr,node,vm) {

        let reg = /{{(.*)}}/;
        expr = reg.exec(expr);
        if(expr == null)return;
        expr = expr[1];
        let val = getVal(expr,vm.$options.data,(val)=>{
            updater.update.textNode(node,val);
        });
        this.update.textNode(node,val);
    },
    update:{
        html(node,val) {
          node.innerHTML = val;
        },
        on(node,type,expr,vm) {
            node.addEventListener(type,function(e){
                vm[expr].call(this,e);
            });
        },
        text(node,val) {
            node.innerText = val;
        },
        bind(node,val,expr,vm){

        },
        show(node,val) {
            if(!(node.LJdisplay)) {
                node.LJdisplay = window.getComputedStyle(node,null).display;
            }
            node.style.display = val?node.LJdisplay:'none';
        },
        model(node,val,expr,vm) {
            node.value = val;
            if(vm) {
                let data =  vm.$options.data;
                let params = expr.split('.');
                for(let i = 0; i <params.length-2;i++) {
                    data = data[params[i]];
                }
                node.addEventListener('input',function(e){
                    data[params[params.length-1]] = e.target.value;
                });
            }
        },
        textNode(node,val) {
            node.textContent = val;
        }
    }
}
//辅助函数
function getVal(expr,data,callback) {

    let params = expr.split('.');
    return params.reduce((pre,curr,i)=> {
        if(i === params.length - 1) {
            new Watcher(pre[curr],(val)=>{
                callback(val);
            });
        }
       return pre[curr];
    },data);
}
function query(el) {
    if(typeof el === 'string') {
        let node = document.querySelector(el);
        if(node) {
            return node;
        }
    }
    if(el?.nodeType === 1) {
        return el;
    }
    return document.createElement('div');
}

export default Compiler;