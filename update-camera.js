// update camera
AFRAME.registerComponent('update-camera',{
    schema:{
        active:{type:'boolean', default: false}
    },
    init: function(){
        console.log('update-camera');
        let el = this.el;
        let comp = this;
        this.camEl = document.querySelector('#orbitcam');
        el.addEventListener('loaded', function(){
            comp.cam3D = comp.camEl.getObject3D('camera');
        });     
        el.addEventListener('setcamera', function(e){
           comp.data.active = true;
        }); 
        el.addEventListener('animationcomplete', function(e){
            comp.data.active = false;
        });             
    },
    tick: function(){
        if (this.data.active){
            let wPos = new THREE.Vector3();
            let pos = this.el.object3D.getWorldPosition(wPos);
            this.cam3D.position.set( wPos.x, wPos.y, wPos.z );            
        }
    }
});