function Calculate(angle) {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  terrain.getContext('2d').clearRect(0, 0, terrain.width, terrain.height);
  Tool.Dot(ray.x, ray.y, 'black', 5)
  Tool.Wall();
  
  //var rX = event != undefined ? event.clientX : ray.x;
  //var rY = event != undefined ? event.clientY : ray.y - 10;
  var handler = [];
  
  //let angle = Translate(Math.atan2(rY - ray.y, rX - ray.x));
  for(let i = 0 - (ray.fov / 2); i < ray.fov / 2; i += ray.fov / 350) {
    let nrX = ray.x + 5e5 * Math.sin((ray.angle + 90 + i) * (Math.PI / 180))
    let nrY = ray.y + 5e5 * Math.cos((ray.angle + 90 + i) * (Math.PI / 180))
    var { x, y, r, l } = Raycast(ray.x, ray.y, nrX, nrY);
    if(l < canvas.width) {
      Tool.Dot(x, y, 'red', 1)
      Tool.Ray(ray.x, ray.y, r, l);
      l *= Math.cos(Math.abs(i) * (Math.PI / 180))
    }
    handler.push(l)
    
  }
  Generate.Load(handler)
  Generate.New()
}
Calculate();
