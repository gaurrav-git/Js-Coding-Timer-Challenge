/*Find Second Largest Number (no sorting)*/

function findSecondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  for (let n of arr) {
    if (n > first)       { second = first; first = n; }
    else if (n > second) { second = n; }
  }
  return second;
}

function runTask1() {
  const nums = [23, 45, 67, 89, 12, 90, 44];
  const result = findSecondLargest(nums);
  const out = document.getElementById('out1');
  out.textContent = `Array: [${nums.join(', ')}]\nSecond Largest: ${result}`;
  out.classList.add('visible');
}


/*Return Unique Elements from Two Arrays*/

function uniqueElements(arr1, arr2) {
  const combined = [...arr1, ...arr2];
  const seen = {};
  const result = [];
  for (let item of combined) {
    if (!seen[item]) { seen[item] = true; result.push(item); }
  }
  return result;
}

function runTask2() {
  const a = [1, 2, 3, 4];
  const b = [3, 4, 5, 6];
  const result = uniqueElements(a, b);
  const out = document.getElementById('out2');
  out.textContent = `Array 1: [${a.join(', ')}]\nArray 2: [${b.join(', ')}]\nUnique Elements: [${result.join(', ')}]`;
  out.classList.add('visible');
}


/*Student Score Analysis*/

function analyzeStudents(students) {
  let topStudent = null, topAvg = -Infinity;
  const lines = [];
  for (let s of students) {
    const avg = s.scores.reduce((a, b) => a + b, 0) / s.scores.length;
    lines.push(`${s.name}: avg = ${avg.toFixed(2)}`);
    if (avg > topAvg) { topAvg = avg; topStudent = s; }
  }
  lines.push(`\nTop Student: ${topStudent.name} with an average score of ${topAvg.toFixed(2)}`);
  return lines.join('\n');
}

function runTask3() {
  const students = [
    { name: 'Alice',   age: 22, scores: [78, 85, 92] },
    { name: 'Bob',     age: 20, scores: [88, 90, 76] },
    { name: 'Charlie', age: 21, scores: [95, 80, 85] }
  ];
  const out = document.getElementById('out3');
  out.textContent = analyzeStudents(students);
  out.classList.add('visible');
}


/*1-Hour Countdown Timer*/

const TOTAL        = 60 * 60;          // 3600 seconds
const CIRCUMFERENCE = 2 * Math.PI * 100; 

let timeLeft      = TOTAL;
let timerInterval = null;
let running       = false;

const displayEl = document.getElementById('timerDisplay');
const ringEl    = document.getElementById('ring');
const msgEl     = document.getElementById('timerMsg');
const startBtn  = document.getElementById('startBtn');
const pauseBtn  = document.getElementById('pauseBtn');

/** Format seconds → MM:SS */
function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/** Update SVG ring offset and colour based on time remaining */
function updateRing() {
  const progress = timeLeft / TOTAL;
  const offset   = CIRCUMFERENCE * (1 - progress);
  ringEl.style.strokeDashoffset = offset;
  // Colour shifts: green → yellow → red as time runs out
  if      (progress > 0.5) ringEl.style.stroke = '#4fffb0';
  else if (progress > 0.2) ringEl.style.stroke = '#e8ff47';
  else                     ringEl.style.stroke = '#ff6b6b';
}

/** Called every second by setInterval */
function tick() {
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    running = false;
    timeLeft = 0;
    displayEl.textContent = '00:00';
    updateRing();
    msgEl.classList.add('show');
    startBtn.disabled = true;
    pauseBtn.disabled = true;
    return;
  }
  timeLeft--;
  displayEl.textContent = formatTime(timeLeft);
  updateRing();
}

function startTimer() {
  if (running) return;
  running = true;
  msgEl.classList.remove('show');
  timerInterval = setInterval(tick, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseTimer() {
  if (!running) return;
  clearInterval(timerInterval);
  running = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  running  = false;
  timeLeft = TOTAL;
  displayEl.textContent          = formatTime(TOTAL);
  ringEl.style.strokeDashoffset  = 0;
  ringEl.style.stroke            = '#4fffb0';
  msgEl.classList.remove('show');
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Initialise ring on page load
updateRing();
