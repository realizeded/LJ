function Watcher(expr,callback) {
    Dep.target = this;
    this.oldValue = expr;
    this.callback = callback;
}
Watcher.prototype.update = function(newValue) {
    if(this.oldValue === newValue) {
        return;
    }
    this.oldValue = newValue;
    this.callback(newValue);
}
//辅助函数 getValue

function Dep() {
    this.subs = [];
};
Dep.prototype.addSub = function(watcher) {
    this.subs.push(watcher);
};
Dep.prototype.notify = function(val) {
  this.subs.forEach(item=>{

     item.update(val);
  });
};
Dep.target = null;
export {Watcher,Dep};