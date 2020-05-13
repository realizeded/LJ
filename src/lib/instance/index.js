import Compiler from '../compiler/index';
import Observer from '../observer/index';
function LJ(options) {
    if(!(this instanceof LJ)) {
        throw new Error("should be a new LJ")
    }
    this.init(options)
}
LJ.prototype.init = function (options){
    this.$options = options;
    new Observer(this);
    new Compiler(this);

}
export default LJ;