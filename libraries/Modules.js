function Interpl(a, b, c, d) {
  let e = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
  let v = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

  let e2 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  let v2 = (b.y - a.y) * (d.x - c.x) - (b.x - a.x) * (d.y - c.y);
  
  var fR = e < 0 ? e > v : e < v;
  if(fR) fR = e2 < 0 ? e2 > v2 : e2 < v2;
  
  return {
    x: Lerp(a.x, b.x, e / v),
    y: Lerp(a.y, b.y, e / v),
    iT: fR 
  }
}

function Translate(r) {
  if(r >= 0) {
    return Math.abs(r - Math.PI * 2) * (180 / Math.PI);
  }
  return Math.abs(r) * (180 / Math.PI);
}

function Translate2(r) {
  if(r >= 0) {
    return Math.abs(r - Math.PI * 2);
  }
  return Math.abs(r);
}

function Lerp(a, b, t) {
  return a + (b - a) * t;
}

class Build {
  constructor() {
    this.ctx = canvas.getContext('2d');
    this.Walls = [];
  }

  Set([x1, y1], [x2, y2]) {
    this.Walls.push([[x1, y1], [x2, y2]])
  }
  
  Dot(x, y, colour, size) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, 2 * Math.PI);
    this.ctx.fillStyle = colour;
    this.ctx.fill();
  }
  
  Ray(x, y, angle, length) {
    this.ctx.save();
    this.ctx.translate(x, y)
    this.ctx.rotate(angle)
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(length, 0);
    this.ctx.lineWidth = 2;
    this.ctx.stroke()
    this.ctx.restore();
  }
  
  Wall() {
    for(let i of this.Walls) {
      this.ctx.beginPath();
      this.ctx.moveTo(i[0][0], i[0][1]);
      this.ctx.lineTo(i[1][0], i[1][1]);
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }
}
