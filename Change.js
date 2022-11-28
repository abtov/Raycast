var rand = (i) => Math.floor(Math.random() * i) + 1
Tool.Set([rand(window.innerWidth), rand(window.innerHeight)], [rand(window.innerWidth), rand(window.innerHeight)]);
document.getElementById('canvas').addEventListener('mousemove', function(event) {
  canvas1.getContext('2d').clearRect(0, 0, canvas1.width, canvas1.height);
  report.innerText = '';
  Tool.Update(event.clientX, event.clientY)
  Tool.Wall()
});
