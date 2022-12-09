terrain.requestPointerLock = terrain.requestPointerLock || terrain.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

terrain.onclick = function() {
  terrain.requestPointerLock();
};

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
  if (document.pointerLockElement === terrain || document.mozPointerLockElement === terrain) return document.addEventListener("mousemove", Movement, false);
  document.removeEventListener("mousemove", Movement, false);
}

function Movement(e) {
  const locked = terrain.height;
  let mx = e.movementX * -1 * 0.04;
  let my = e.movementY * -1 * 0.7;
  if(my + m < terrain.height + locked && my + m > 0 - locked) m += my;
  if(ray.angle + mx > 360) {
    ray.angle = (ray.angle + mx - 360);
  } else {
    if(ray.angle + mx < 1) {
      ray.angle = ray.angle + mx + 360;
    } else {
      ray.angle = (ray.angle + mx);
    }
  }
}

var Keys = {}
document.addEventListener('keydown', SetKey)
document.addEventListener('keyup', DeleteKey)

function SetKey(e) {
  if(Keys[`${e.key}`]) return;
  Keys[`${e.key}`] = true;
  return requestAnimationFrame(Walking);
}

function DeleteKey(e) {
  return delete Keys[`${e.key}`];
}

function Walking() {
  var offSet = 0, vel = 1.2;
  if(Object.keys(Keys).length == 0) return;

  if(Keys['a']) offSet += 90;
  if(Keys['d']) offSet -= 90;
  if(Keys['s']) offSet += 180;
  ray.x += vel * Math.sin((ray.angle + 90 + offSet) * (Math.PI / 180))
  ray.y += vel * Math.cos((ray.angle + 90 + offSet) * (Math.PI / 180))
}

setInterval(Walking, 20)
