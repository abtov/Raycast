function Raycast(ox, oy, lx, ly) {
  var ex = null;
  var ey = null;
  
  let rX = lx - ox;
  let rY = ly - oy;
  let endPoint = Math.sqrt(rX ** 2 + rY ** 2);
  let angle = Math.atan2(rY, rX);
  
  Tool.Walls.forEach(function(i) {
    let a1 = { x: ox, y: oy };
    let a2 = { x: lx, y: ly };
    let b1 = { x: i[0][0], y: i[0][1] };
    let b2 = { x: i[1][0], y: i[1][1] };
    let { x, y, iT } = Interpl(a1, a2, b1, b2)
    
    if(!iT) return { x: null, y: null, r: null, l: null };
    newEndPoint = Math.sqrt((x - ox) ** 2 + (y - oy) ** 2);
    if(newEndPoint < endPoint) {
      endPoint = newEndPoint;
      ex = x, ey = y;
    }
  });
  
  return { x: ex, y: ey, r: angle, l: endPoint }
}
