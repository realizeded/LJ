import LJ from "./lib/instance/index.js";
window.vm = new LJ({
  el:"#app",
  data:{
      msg:'344'
  },
  methods:{
      func() {
          console.log('ess')
      }
  }
});
