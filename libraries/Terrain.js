class Terrain {
  constructor() {
    this.ctx = terrain.getContext('2d') 
    this.Frame = [];
  }

  Load(array) {
    this.Frame = array.reverse();
  }

  New() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, terrain.width, m);
    
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, m, terrain.width, terrain.height - m);

    var Tr = 0, size = 10;
    let cP = terrain.width / this.Frame.length;
    this.ctx.beginPath();
    for(let i = 0; i < this.Frame.length; i++) {
      if(i > 0) Tr = Tr + terrain.width / this.Frame.length;
      if(this.Frame[i] > canvas.width * 2 || this.Frame[i] == null) continue;
      let tC = 255 / canvas.width * this.Frame[i] * 2 * -1 + 255;
      this.ctx.fillStyle = `rgb(0, 0, ${tC})`;

      let rO = 27 * canvas.height / this.Frame[i]
      this.ctx.fillRect(Tr, m - rO / 2, cP + 1, rO);
    }
  }
}
