document.addEventListener("DOMContentLoaded", () => {
  const bars = document.getElementById("searchBars");
  if (!bars) return;

  const title = document.getElementById("algorithmTitle");
  const description = document.getElementById("algorithmDescription");
  const editor = document.getElementById("arrayEditor");
  const countOutput = document.getElementById("elementCount");
  const targetInput = document.getElementById("targetInput");
  const status = document.getElementById("targetStatus");
  const slider = document.getElementById("speedSlider");
  const speedOutput = document.getElementById("speedValue");
  const playButton = document.getElementById("playButton");

  const meta = {
    linear: {
      title: "Linear Search",
      description: "Checks each element one by one until the target is found."
    },
    binary: {
      title: "Binary Search",
      description: "Repeatedly halves a sorted search range to locate the target efficiently."
    }
  };

  let algorithm = "linear";
  let values = [3, 6, 1, 2, 9, 15, 32, 30, 29, 28, 25, 22, 21, 2];
  let original = [...values];
  let running = false;
  let stop = false;

  function renderBars(states = {}) {
    bars.innerHTML = "";
    const max = Math.max(...values, 1);
    values.forEach((v, i) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      if (states.active?.includes(i)) bar.classList.add("active");
      if (states.target?.includes(i)) bar.classList.add("target");
      if (states.found?.includes(i)) bar.classList.add("found");
      if (states.range && !states.range.includes(i)) bar.classList.add("dimmed");
      bar.style.height = `${Math.max(7, (v / max) * 87)}%`;
      const label = document.createElement("span");
      label.textContent = v;
      bar.appendChild(label);
      bars.appendChild(bar);
    });
  }

  function renderEditor() {
    editor.innerHTML = "";
    values.forEach((value, index) => {
      const wrap = document.createElement("div");
      wrap.className = "value-editor";
      const actions = document.createElement("div");
      actions.className = "mini-actions";

      const minus = document.createElement("button");
      minus.textContent = "−";
      minus.onclick = () => { values[index] = Math.max(1, values[index] - 1); sync(); };

      const plus = document.createElement("button");
      plus.textContent = "+";
      plus.onclick = () => { values[index] = Math.min(99, values[index] + 1); sync(); };

      actions.append(minus, plus);

      const input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.max = "99";
      input.value = value;
      input.onchange = () => { values[index] = ALVIATools.clamp(Number(input.value) || 1, 1, 99); sync(); };

      wrap.append(actions, input);
      editor.appendChild(wrap);
    });
    countOutput.textContent = values.length;
  }

  function sync() {
    original = [...values];
    renderEditor();
    renderBars();
    status.textContent = "Ready to search";
  }

  function speed() { return Number(slider.value); }

  async function wait() {
    speedOutput.textContent = `${slider.value}ms`;
    await ALVIATools.sleep(speed());
    return stop;
  }

  async function linearSearch(target) {
    for (let i = 0; i < values.length; i++) {
      renderBars({ active: [i], target: values[i] === target ? [i] : [] });
      status.textContent = `Checking index ${i}...`;
      if (await wait()) return;
      if (values[i] === target) {
        renderBars({ found: [i] });
        status.textContent = `Found ${target} at index ${i}.`;
        return;
      }
    }
    status.textContent = `${target} was not found.`;
  }

  async function binarySearch(target) {
    values = [...values].sort((a, b) => a - b);
    renderEditor();
    let low = 0, high = values.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const range = Array.from({ length: high - low + 1 }, (_, k) => low + k);
      renderBars({ active: [mid], range, target: values[mid] === target ? [mid] : [] });
      status.textContent = `Checking index ${mid}...`;
      if (await wait()) return;

      if (values[mid] === target) {
        renderBars({ found: [mid] });
        status.textContent = `Found ${target} at sorted index ${mid}.`;
        return;
      }
      if (values[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    status.textContent = `${target} was not found.`;
  }

  async function play() {
    if (running) return;
    running = true;
    stop = false;
    playButton.innerHTML = "■ <span>Stop</span>";
    const target = Number(targetInput.value);

    if (!Number.isFinite(target)) {
      status.textContent = "Enter a target value first.";
    } else if (algorithm === "linear") {
      await linearSearch(target);
    } else {
      await binarySearch(target);
    }

    running = false;
    stop = false;
    playButton.innerHTML = "▶ <span>Play</span>";
  }

  function reset() {
    if (running) stop = true;
    values = [...original];
    renderEditor();
    renderBars();
    status.textContent = "Ready to search";
    playButton.innerHTML = "▶ <span>Play</span>";
  }

  function setAlgorithm(next) {
    algorithm = next;
    title.textContent = meta[next].title;
    description.textContent = meta[next].description;
    document.querySelectorAll(".algorithm-option").forEach(b => b.classList.toggle("active", b.dataset.algorithm === next));
    reset();
  }

  function changeCount(delta) {
    if (running) return;
    if (delta > 0 && values.length < 24) values.push(Math.floor(Math.random() * 40) + 1);
    if (delta < 0 && values.length > 3) values.pop();
    sync();
  }

  document.querySelectorAll(".algorithm-option").forEach(b => b.onclick = () => setAlgorithm(b.dataset.algorithm));
  document.getElementById("playButton").onclick = play;
  document.getElementById("resetButton").onclick = reset;
  document.getElementById("increaseCount").onclick = () => changeCount(1);
  document.getElementById("decreaseCount").onclick = () => changeCount(-1);
  document.getElementById("addButton").onclick = () => changeCount(1);
  document.getElementById("pushButton").onclick = () => changeCount(1);
  document.getElementById("popButton").onclick = () => changeCount(-1);
  document.getElementById("randomButton").onclick = () => {
    if (running) return;
    values = ALVIATools.randomArray(values.length);
    sync();
  };
  slider.oninput = () => speedOutput.textContent = `${slider.value}ms`;

  sync();
});
