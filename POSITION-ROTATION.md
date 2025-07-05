
aframe.scene.camera.getposition,zoom,rotation
camEl = scene.
AFRAME.scenes[0].camera.position
AFRAME.scenes[0].camera.quaternion

AFRAME.scenes[0].camera.zoom
remove attribute orbit-controls
manually set camera position and rotation
change rotation to euler
convenience copy pasta for set 1 json with both

then animate the container around the camera
broadcast component

var helperQuaternionSend = new THREE.Quaternion();
helperQuaternionSend.copy(el.object3D.quaternion);


document.getElementById("camera").getAttribute("orbit-controls", "enabled")
document.getElementById("camera").setAttribute("orbit-controls", "enabled", "false")
document.getElementById("camera").setAttribute("orbit-controls", "enabled", "true")

var jsonfun = {"position": AFRAME.scenes[0].camera.position, "quaternion": AFRAME.scenes[0].camera.quaternion}
var jsonfun2 = {"position": AFRAME.scenes[0].camera.position, "quaternion": AFRAME.scenes[0].camera.quaternion}

AFRAME.scenes[0].camera.position = jsonfun["position"] // doesn't seem to work brah

AFRAME.scenes[0].camera.el.
AFRAME.scenes[0].camera.position.copy(jsonfun2["position"])

AFRAME.scenes[0].camera.el.getObject3D('camera').position.set(0, 0, 0); //works!


AFRAME.scenes[0].camera.el.setAttribute("animation__1", "property: object3D.position.y; from: 1; to: 3")

AFRAME.scenes[0].camera.el.setAttribute("animation__1", "property: object3D.position.y; from: 0; to: 1")

AFRAME.scenes[0].camera.el.getObject3D('camera').position.set(0, 10, -4); //works!
AFRAME.scenes[0].camera.el.setAttribute("animation__1", "property: object3D.position.x; from: 100; to: 0; easing: easeOutSine; dur: 2000;")

AFRAME.scenes[0].camera.el.getObject3D('camera').position.set(0, 10, -4); //works!
AFRAME.scenes[0].camera.el.setAttribute("animation__1", "property: object3D.position; from: 100 10 -4; to: 0 10 -4; easing: easeOutSine; dur: 2000;")

AFRAME.scenes[0].camera.el.setAttribute("animation__1", "property: position; from: 0 10 -2; to: 0 1 5; easing: easeOutSine; dur: 2000;")
