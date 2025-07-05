// update target
AFRAME.registerComponent("update-target", {
    schema:{
        active:{type:'boolean', default: false}
    },
    init: function(){
        console.log('update-target');
        let el = this.el;
        let comp = this;
        this.camEl = document.querySelector('#orbitcam');
       
        el.addEventListener('loaded', function(){
            comp.target = comp.camEl.getObject3D('camera');
        });     
        el.addEventListener('settarget', function(e){
            comp.data.active = true;
        });   
        el.addEventListener('animationcomplete', function(e){
            comp.data.active = false;
        });        
    },
    tick: function(){
        if (this.data.active){
            let pos = vectorToString(this.el.getAttribute('position'));
            this.camEl.setAttribute('orbit-controls', 'target', pos);
        }
    }
});