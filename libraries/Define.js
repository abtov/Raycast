const canvas1 = document.getElementById('canvas');
canvas1.width = window.innerWidth, canvas1.height = window.innerHeight;

var Tool = new Construct('2d', canvas1.width / 2, canvas1.height / 2);
var report = document.getElementById('Info');

function Report(d) {
  if(report.innerText.split('').length != 0) return;
  report.innerText = `${report.innerText}\n${d}`;
}
