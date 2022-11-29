const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth, canvas.height = window.innerHeight;
const ray = { x: canvas.width / 2, y: canvas.height / 2 }
const rand = (i) => Math.floor(Math.random() * i) + 1;
const Tool = new Build();

Tool.Set([rand(window.innerWidth), rand(window.innerHeight)],
         [rand(window.innerWidth), rand(window.innerHeight)]);
Tool.Wall();
Tool.Ray(ray.x, ray.y, 0, 20);
Tool.Dot(ray.x, ray.y, 'black', 5);
