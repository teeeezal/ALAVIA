document.addEventListener("DOMContentLoaded", () => {
  const bars = document.getElementById("sortingBars");
  if (!bars) return;

  const title = document.getElementById("algorithmTitle");
  const description = document.getElementById("algorithmDescription");
  const arrayEditor = document.getElementById("arrayEditor");
  const countOutput = document.getElementById("elementCount");
  const speedSlider = document.getElementById("speedSlider");
  const speedOutput = document.getElementById("speedValue");
  const playButton = document.getElementById("playButton");
  const resetButton = document.getElementById("resetButton");

  const meta = {
    bubble: {
      title: "Bubble Sort",
      description: "Repeatedly compares adjacent elements and swaps them when they are in the wrong order."
    },
    insertion: {
      title: "Insertion Sort",
      description: "Builds a sorted section by inserting each new value into its correct position."
    },
    selection: {
      title: "Selection Sort",
      description: "Finds the smallest remaining value and places it at the next sorted position."
    },
    merge: {
      title: "Merge Sort",
      description: "Divides the array into smaller parts, then merges those parts back in sorted order."
    },
    quick: {
      title: "Quick Sort",
      description: "Partitions around a pivot, then recursively sorts the values on either side."
    }
  };

  let algorithm = "bubble";
  let values = [3, 6, 1, 2, 9, 15, 32, 30, 29, 28, 25, 22, 21, 2];
  let original = [...values];
  let running = false;
  let stopRequested = false;

  function renderBars(states = {}) {
    bars.innerHTML = "";
    const max = Math.max(...values, 1);
    values.forEach((value, i) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      if (states.active?.includes(i)) bar.classList.add("active");
      if (states.compare?.includes(i)) bar.classList.add("compare");
      if (states.sorted?.includes(i)) bar.classList.add("sorted");
      bar.style.height = `${Math.max(7, (value / max) * 87)}%`;
      const label = document.createElement("span");
      label.textContent = value;
      bar.appendChild(label);
      bars.appendChild(bar);
    });
  }

  function renderEditor() {
    arrayEditor.innerHTML = "";
    values.forEach((value, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "value-editor";

      const actions = document.createElement("div");
      actions.className = "mini-actions";

      const minus = document.createElement("button");
      minus.textContent = "−";
      minus.title = "Decrease value";
      minus.onclick = () => {
        values[index] = Math.max(1, values[index] - 1);
        renderEditor();
        renderBars();
      };

      const plus = document.createElement("button");
      plus.textContent = "+";
      plus.title = "Increase value";
      plus.onclick = () => {
        values[index] = Math.min(99, values[index] + 1);
        renderEditor();
        renderBars();
      };

      actions.append(minus, plus);

      const input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.max = "99";
      input.value = value;
      input.setAttribute("aria-label", `Element ${index + 1}`);
      input.onchange = () => {
        values[index] = ALVIATools.clamp(Number(input.value) || 1, 1, 99);
        renderEditor();
        renderBars();
      };

      wrapper.append(actions, input);
      arrayEditor.appendChild(wrapper);
    });
    countOutput.textContent = values.length;
  }

  function setAlgorithm(next) {
    algorithm = next;
    title.textContent = meta[next].title;
    description.textContent = meta[next].description;
    document.querySelectorAll(".algorithm-option").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.algorithm === next);
    });
    reset();
  }

  function speed() {
    return Number(speedSlider.value);
  }

  function updateSpeed() {
    speedOutput.textContent = `${speedSlider.value}ms`;
  }

  async function frame(active = [], compare = [], sorted = []) {
    renderBars({ active, compare, sorted });
    await ALVIATools.sleep(speed());
    return stopRequested;
  }

  async function bubbleSort() {
    const sorted = new Set();
    for (let end = values.length - 1; end > 0; end--) {
      for (let i = 0; i < end; i++) {
        if (await frame([], [i, i + 1], [...sorted])) return;
        if (values[i] > values[i + 1]) {
          [values[i], values[i + 1]] = [values[i + 1], values[i]];
          if (await frame([i, i + 1], [], [...sorted])) return;
        }
      }
      sorted.add(end);
    }
    renderBars({ sorted: values.map((_, i) => i) });
  }

  async function insertionSort() {
    for (let i = 1; i < values.length; i++) {
      let j = i;
      while (j > 0) {
        if (await frame([], [j - 1, j])) return;
        if (values[j - 1] <= values[j]) break;
        [values[j - 1], values[j]] = [values[j], values[j - 1]];
        j--;
      }
    }
    renderBars({ sorted: values.map((_, i) => i) });
  }

  async function selectionSort() {
    for (let i = 0; i < values.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < values.length; j++) {
        if (await frame([min], [j], Array.from({ length: i }, (_, k) => k))) return;
        if (values[j] < values[min]) min = j;
      }
      [values[i], values[min]] = [values[min], values[i]];
      if (await frame([i, min], [], Array.from({ length: i + 1 }, (_, k) => k))) return;
    }
    renderBars({ sorted: values.map((_, i) => i) });
  }

  async function mergeSort() {
    async function merge(left, mid, right) {
      const temp = [];
      let i = left, j = mid + 1;
      while (i <= mid && j <= right) {
        if (await frame([], [i, j])) return true;
        if (values[i] <= values[j]) temp.push(values[i++]);
        else temp.push(values[j++]);
      }
      while (i <= mid) temp.push(values[i++]);
      while (j <= right) temp.push(values[j++]);
      for (let k = 0; k < temp.length; k++) {
        values[left + k] = temp[k];
        if (await frame([left + k])) return true;
      }
      return false;
    }
    async function divide(left, right) {
      if (left >= right) return false;
      const mid = Math.floor((left + right) / 2);
      if (await divide(left, mid)) return true;
      if (await divide(mid + 1, right)) return true;
      return merge(left, mid, right);
    }
    await divide(0, values.length - 1);
    renderBars({ sorted: values.map((_, i) => i) });
  }

  async function quickSort() {
    async function partition(low, high) {
      const pivot = values[high];
      let i = low;
      for (let j = low; j < high; j++) {
        if (await frame([high], [j])) return null;
        if (values[j] < pivot) {
          [values[i], values[j]] = [values[j], values[i]];
          i++;
          if (await frame([i, j], [high])) return null;
        }
      }
      [values[i], values[high]] = [values[high], values[i]];
      await frame([i]);
      return i;
    }
    async function sort(low, high) {
      if (low >= high) return;
      const p = await partition(low, high);
      if (p === null) return;
      await sort(low, p - 1);
      await sort(p + 1, high);
    }
    await sort(0, values.length - 1);
    renderBars({ sorted: values.map((_, i) => i) });
  }

  async function play() {
    if (running) return;
    running = true;
    stopRequested = false;
    playButton.innerHTML = "■ <span>Stop</span>";

    if (algorithm === "bubble") await bubbleSort();
    if (algorithm === "insertion") await insertionSort();
    if (algorithm === "selection") await selectionSort();
    if (algorithm === "merge") await mergeSort();
    if (algorithm === "quick") await quickSort();

    running = false;
    stopRequested = false;
    playButton.innerHTML = "▶ <span>Play</span>";
  }

  function reset() {
    if (running) stopRequested = true;
    values = [...original];
    renderEditor();
    renderBars();
    playButton.innerHTML = "▶ <span>Play</span>";
  }

  function changeCount(delta) {
    if (running) return;
    if (delta > 0 && values.length < 24) values.push(Math.floor(Math.random() * 40) + 1);
    if (delta < 0 && values.length > 3) values.pop();
    original = [...values];
    renderEditor();
    renderBars();
  }

  document.querySelectorAll(".algorithm-option").forEach(btn => {
    btn.addEventListener("click", () => setAlgorithm(btn.dataset.algorithm));
  });

  document.getElementById("playButton").onclick = play;
  document.getElementById("resetButton").onclick = () => {
    original = [...values];
    reset();
  };
  document.getElementById("increaseCount").onclick = () => changeCount(1);
  document.getElementById("decreaseCount").onclick = () => changeCount(-1);
  document.getElementById("addButton").onclick = () => changeCount(1);
  document.getElementById("popButton").onclick = () => changeCount(-1);
  document.getElementById("pushButton").onclick = () => changeCount(1);
  document.getElementById("randomButton").onclick = () => {
    if (running) return;
    values = ALVIATools.randomArray(values.length);
    original = [...values];
    renderEditor();
    renderBars();
  };
  speedSlider.addEventListener("input", updateSpeed);

  updateSpeed();
  renderEditor();
  renderBars();
});
