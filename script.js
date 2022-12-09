class Main {
  constructor(name, cb) {
    this.name = name;
    this.cb = cb;
  }
  
  Create() {
    this.app = new App(this.name, this.cb)
    this.app.runLoop();
  }
  
  async Update(msg) {
    msg = await msg.data.text();
    msg = JSON.parse(msg)
    
    console.log(msg)
    return;
  }

  Close() {
    this.app.stopLoop();
  }
}

async function RequestHandler(id) {
  const response = await fetch(`https://Raycast-Map-Server.bennguyen2.repl.co/?map=${id}`);
  return response.json();
} 

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

(async function() {
  let promised = await RequestHandler(params.map) || [];
  if('error' in promised || !promised) return console.log(promised);
  promised.seed.forEach((i) => Tool.Set(...i));
  const main = new Main('Doc', Calculate)
  main.Create();
})()
