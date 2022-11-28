
function lerp(a, b, t) {
  return a + (b - a) * t;
}

class Construct {
  constructor(id, x, y) {
    this.ctx = canvas1.getContext(id);
    this.Ray = {
      x: x, 
      y: y,
      r: 0,
      eP: null,
    }
    this.Mouse = {
      x: null, 
      y: null
    }
    this.Walls = [];
  }

  Dot(x, y, c) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }

  Interpl(a, b, c, d) {
    const e = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
    const v = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

    const e2 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const v2 = (b.y - a.y) * (d.x - c.x) - (b.x - a.x) * (d.y - c.y);
    
    var fR = e < 0 ? e > v : e < v;
    if(fR) fR = e2 < 0 ? e2 > v2 : e2 < v2;
    
    return {
      orgn: {
        e: e,
        v: v,
        e2: e2,
        v2: v2
      },
      x: lerp(a.x, b.x, e / v),
      y: lerp(a.y, b.y, e / v),
      iT: fR 
    }
  }

  Rotate(x, y, r, l) {
    this.ctx.save();
    this.ctx.translate(this.Ray.x, this.Ray.y)
    this.ctx.rotate(this.r)
  
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(l, 0);
    this.ctx.lineWidth = 2;
    this.ctx.stroke()
  
    this.ctx.restore();
  }
  
  Update(mx, my) {
    this.MouseX = mx,
    this.MouseY = my;
    
    let rX = this.MouseX - this.Ray.x;
    let rY = this.MouseY - this.Ray.y;
    this.r = Math.atan2(rY, rX)
    for(let i of this.Walls) {
      let { x, y, iT, orgn } = this.Interpl(
        { x: this.Ray.x, y: this.Ray.y },
        { x: this.MouseX, y: this.MouseY },
        { x: i[0][0], y: i[0][1]},
        { x: i[1][0], y: i[1][1]}
      )
      this.Ray.eP = Math.sqrt(rX ** 2 + rY ** 2);
      if(iT) {
        this.Dot(x, y, 'red')
        this.Ray.eP = Math.sqrt((x - this.Ray.x) ** 2 + (y - this.Ray.y) ** 2);
      }
      this.Rotate(this.Ray.x, this.Ray.y, this.r, this.Ray.eP);
      this.Rotate(this.Ray.x, this.Ray.y, this.r, this.Ray.eP);
      this.Rotate(this.Ray.x, this.Ray.y, this.r, this.Ray.eP);
      Report(`x: ${x}
      y: ${y}
      angle:${this.r}
      length:${this.Ray.eP}
      intersect: ${x}, ${y}
      origin: ${orgn.e}, ${orgn.v}
      cur: ${orgn.e / orgn.v}
      new: ${orgn.e2}, ${orgn.v2}`);
      
    }
  }
  
  Set([x1, y1], [x2, y2]) {
    this.Walls.push([[x1, y1], [x2, y2]])
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
