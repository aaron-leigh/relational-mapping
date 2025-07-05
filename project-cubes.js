AFRAME.registerComponent('project-cubes',{
    init: function(){
        let el = this.el;
        let comp = this;
        let numProjects = 10;
        let sceneEl = document.querySelector('a-scene');

        // Make an array of objects that contain positions
        let projects = [
            { position: [0, 3, 4]},
            { position: [4, 3, -2.5]},
            { position: [-4, 3, -2.5]},
            { position: [-10, 3, -8]},
            { position: [10, 3, -8]},
            { position: [0, 3, -12.5]},
            { position: [-12, 3, 3]},
            { position: [12, 3, 3]},
            { position: [-5.5, 3, 11.5]},
            { position: [5.5, 3, 11.5]}
        ];

      // Find the center of all objects
        let centroid = getCentroid(projects);
        let centroid3D = new THREE.Vector3( centroid[0], centroid[1], centroid[2] );
        let centroidString = arrayToString(centroid);
        let ipos = '20 '+centroid[1].toString()+' 10'; // initial position of camera
      
        // Set initial position of orbitcontrols
        let oc = document.querySelector('#orbitcam');       
        oc.setAttribute('orbit-controls', 'target', centroidString);
        oc.setAttribute('orbit-controls', 'initialPosition', ipos);

         // Get the camera as a THREE object. Element must be loaded before THREE access.
         oc.addEventListener('loaded', function(){
            comp.cam3D = oc.getObject3D('camera');
        }); 

        let position, pos;
        let size = 3;
        let pNameEl = document.querySelector('#project-name');
        let cam = document.querySelector('#camrig');
        let orbitCam = document.querySelector('#orbitcam');
        let nullCam = document.querySelector('#null-cam');
        let nullTarget = document.querySelector('#null-target');
        let i = 0;
        projects.forEach(function(project){
            i++;
            project['element'] = document.createElement('a-entity'); // Create the Entity
            project.element.setAttribute('geometry', {primitive: 'box', width: size, height: size, depth: size }); // Add Geometry attribute
            project.element.id="cube_"+i.toString(); // Add id attribute

            // Position of entity
            posString = arrayToString(project.position); // position as string for attribute assignment
            project.element.setAttribute('position', posString); // Add the position attribute         
            project.position3D = new THREE.Vector3(project.position[0],project.position[1], project.position[2] ); // save position as Vector3
          
            // Position of camera for viewing. View is position projected from centroid.
            let vecFromCentroid = new THREE.Vector3();
            vecFromCentroid.subVectors(project.position3D, centroid3D); // Get Vector from centroid to position
            let vecPos3D = project.position3D.clone();
            project.camPosition3D = vecPos3D.addScaledVector(vecFromCentroid, 0.1);
         
           // Material
            project['color'] = getRandomColor();
          project.element.setAttribute('material', {color: project.color, transparent: true, opacity: 0.0});
            project.element.setAttribute('material', 'color', project.color);
            project.element.setAttribute('class', 'clickable' );

          
            // Mouse Click
            project.element.addEventListener('click', function(evt){
                // Set the null cam to the current worldspace position of the camera
                let curCamPos3D = comp.cam3D.position;
                let curCamString = vectorToString(curCamPos3D);
              
                // Set the null camera to the current position of the camera              
                nullCam.setAttribute('position', curCamString );
                // Tell the nullCam that animation is now active
                nullCam.emit('setcamera'); 
                // Animate the null camera to move from current camera pos to new clicked pos.
                nullCam.setAttribute('animation','to', vectorToString( project.camPosition3D));  
                nullCam.emit('camjump'); 

               // Tell the null target that animation is now active.
                nullTarget.emit('settarget');
              // Animate the null target to move from current pos to new clicked pos.
                nullTarget.setAttribute('animation','to', vectorToString( project.position3D));
                nullTarget.emit('camjump'); 
            });
          
            sceneEl.appendChild(project.element);
            // console.log( project.name,project);
        });
    }
});

// vectorToString(arr)
function vectorToString(arr){
    // console.log('vectorToString', arr);
    return arr['x'].toString()+" "+arr['y'].toString()+" "+arr['z'].toString();
}

// arrayToString(arr)
function arrayToString(arr){
    // console.log('arrayToString', arr);
    return arr[0].toString()+" "+arr[1].toString()+" "+arr[2].toString();
}
// arrayToVector(arr)
function arrayToVector(arr){
    // console.log('arrayToVector', arr);
    return {x: arr[0], y: arr[1], z: arr[2] }   
}

// getRandomColor
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// getCentroid
function getCentroid(projects){
    let positionSum = [0, 0, 0];
    projects.forEach(function(p){
        positionSum[0] += p.position[0];
        positionSum[1] += p.position[1];
        positionSum[2] += p.position[2];
        // console.log(p.position);
    });
    // console.log('positionSum', positionSum);
    positionSum[0] /= projects.length;
    positionSum[1] /= projects.length;
    positionSum[2] /= projects.length;
    // console.log('centroid', positionSum);
    return positionSum;
}
