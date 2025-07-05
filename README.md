<b>Orbit Animate</b><br>
This demonstrates how to animate the camera and target of `orbit-controls` component.
Unfornately, this can't be done directly, as `orbit-controls` parameters overrides the position componenet
and has no way to set the position of the camera directly. Even the target attribute does not respond 
to animation controller calls. Not exactly sure why, and would love to discover how to make this work.
Instead, this demo uses a work around.

It animates proxy entities for camera and target, *'null-camera'* and *'null-target'*, that are placed at the same
position as camera and target, and on click, then animate moving to the new location. They have custom components
*'update-camera'* and *'update-target'* that move the camera and target to their location on each frame.
The camera is moved using THREEjs commands, and the target is moved using `setAttribute('orbit-controls', 'target', pos)`.

Also demonstrates how to generate entities with code and set attributes.


