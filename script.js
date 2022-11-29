canvas.addEventListener('mousemove', function(event) {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  Tool.Dot(ray.x, ray.y, 'black', 5)
  Tool.Wall();
  
  let cx = event.clientX;
  let cy = event.clientY;
  let rX = cx - ray.x;
  let rY = cy - ray.y;
  let angle = Math.atan2(rY, rX)
  let endPoint = Math.sqrt(rX ** 2 + rY ** 2);

  Tool.Walls.forEach(function(i) {
    var { x, y, iT } = Interpl({ x: ray.x, y: ray.y }, { x: cx, y: cy },
                               { x: i[0][0], y: i[0][1]}, { x: i[1][0], y: i[1][1]})
    if(iT) {
      Tool.Dot(x, y, 'red', 5)
      endPoint = Math.sqrt((x - ray.x) ** 2 + (y - ray.y) ** 2);
    }
    Tool.Ray(ray.x, ray.y, angle, endPoint);
  });
});
