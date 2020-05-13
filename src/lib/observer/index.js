import {Dep} from "../watcher/watcher";
function Observer(vm) {
    if(!(this instanceof Observer)) {
        throw new Error("should be a new Observer");
    }
    this.init(vm);
}
Observer.prototype.init = function(vm) {
    this._vm = vm;
    this._data = vm.$options.data;
    this._data = typeof this._data === 'function'?this._data.call(this):this._data;
    this._methods = vm.$options.methods;
    if(this._methods)ProxyMethods(vm,this._methods);
    if(this._data)ProxyData(vm,this._data)
    observer(vm,this._data);
};
function ProxyMethods(vm,methods) {
    let keys = Object.keys(methods);
    for(let key of keys) {
        proxyTarget(vm,key,methods);
    }
};
function ProxyData(vm,data) {
    let keys = Object.keys(data);
    for(let key of keys) {
        if(vm.hasOwnProperty(key)) {
            throw Error('Methods cannot have the same name as an attribute in data');
        }
        proxyTarget(vm,key,data);
    }
};
function proxyTarget(target,key,data) {
    Object.defineProperty(target,key,{

       enumerable:true,
       configurable:true,
       get() {
           return data[key];
       },
       set(val) {
           if(val===data[key]) {
               return;
           }
           data[key] = val;
       }
    });
};
function observer(vm,data) {
   let keys = Object.keys(data);
   keys.forEach(key=>{
       if(data[key] instanceof Object) {
           observer(vm,data[key]);
       } else {
           defineReactive(data,key,data[key]);
       }

   });
}
function defineReactive(data,key,oldVal) {
    let dep = new Dep();
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:true,
        get() {
            if(Dep.target) {
                dep.addSub(Dep.target);
                Dep.target = null;
            }
            return oldVal;
        },
        set(val) {
            if(val===oldVal) {
                return;
            }
            oldVal = val;
            dep.notify(val);
        }
    });
}
export default Observer;