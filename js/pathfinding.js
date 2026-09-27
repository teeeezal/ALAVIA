document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.getElementById("pathGrid");
  if (!gridEl) return;

  const ROWS = 18;
  const COLS = 35;
  const title = document.getElementById("algorithmTitle");
  const description = document.getElementById("algorithmDescription");
  const slider = document.getElementById("speedSlider");
  const speedOutput = document.getElementById("speedValue");
  const playButton = document.getElementById("playButton");

  const meta = {
    bfs: {
      title: "Breadth-First Search",
      description: "Explores the grid layer by layer to find a shortest path in an unweighted grid."
    },
    dfs: {
      title: "Depth-First Search",
      description: "Follows one route as deeply as possible before backtracking to explore another route."
    }
  };

  let algorithm = "bfs";
  let start = { r: 8, c: 5 };
  let end = { r: 8, c: 29 };
  let walls = new Set();
  let tool = "wall";
  let running = false;
  let stop = false;
  let mouseDown = false;

  const key = (r, c) => `${r},${c}`;

  function neighbors(node) {
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    return dirs
      .map(([dr, dc]) => ({ r: node.r + dr, c: node.c + dc }))
      .filter(n => n.r >= 0 && n.r < ROWS && n.c >= 0 && n.c < COLS && !walls.has(key(n.r, n.c)));
  }

  function buildGrid() {
    gridEl.style.setProperty("--cols", COLS);
    gridEl.innerHTML = "";
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const node = document.createElement("button");
        node.className = "node";
        node.dataset.r = r;
        node.dataset.c = c;
        node.type = "button";
        node.setAttribute("aria-label", `Row ${r + 1}, Column ${c + 1}`);

        node.addEventListener("mousedown", e => {
          e.preventDefault();
          mouseDown = true;
          handleCell(r, c);
        });
        node.addEventListener("mouseenter", () => {
          if (mouseDown && tool === "wall") handleCell(r, c);
        });
        node.addEventListener("mouseup", () => { mouseDown = false; });
        gridEl.appendChild(node);
      }
    }
    render();
  }

  document.addEventListener("mouseup", () => { mouseDown = false; });

  function render(state = {}) {
    const visited = state.visited || new Set();
    const path = state.path || new Set();
    [...gridEl.children].forEach(cell => {
      const r = Number(cell.dataset.r), c = Number(cell.dataset.c);
      const k = key(r, c);
      cell.className = "node";
      if (walls.has(k)) cell.classList.add("wall");
      if (visited.has(k)) cell.classList.add("visited");
      if (path.has(k)) cell.classList.add("path");
      if (r === start.r && c === start.c) cell.classList.add("start");
      if (r === end.r && c === end.c) cell.classList.add("end");
    });
  }

  function handleCell(r, c) {
    if (running) return;
    const k = key(r, c);

    if (tool === "wall") {
      if ((r === start.r && c === start.c) || (r === end.r && c === end.c)) return;
      walls.has(k) ? walls.delete(k) : walls.add(k);
    }
    if (tool === "start") {
      if (r === end.r && c === end.c) return;
      walls.delete(k);
      start = { r, c };
    }
    if (tool === "end") {
      if (r === start.r && c === start.c) return;
      walls.delete(k);
      end = { r, c };
    }
    render();
  }

  function speed() { return Number(slider.value); }

  async function visitFrame(visited) {
    render({ visited });
    await ALVIATools.sleep(speed());
    return stop;
  }

  async function bfs() {
    const queue = [start];
    const seen = new Set([key(start.r, start.c)]);
    const parent = new Map();
    const visited = new Set();

    while (queue.length) {
      const current = queue.shift();
      const ck = key(current.r, current.c);
      visited.add(ck);
      if (await visitFrame(visited)) return null;
      if (current.r === end.r && current.c === end.c) return parent;

      for (const next of neighbors(current)) {
        const nk = key(next.r, next.c);
        if (!seen.has(nk)) {
          seen.add(nk);
          parent.set(nk, ck);
          queue.push(next);
        }
      }
    }
    return false;
  }

  async function dfs() {
    const stack = [start];
    const seen = new Set([key(start.r, start.c)]);
    const parent = new Map();
    const visited = new Set();

    while (stack.length) {
      const current = stack.pop();
      const ck = key(current.r, current.c);
      visited.add(ck);
      if (await visitFrame(visited)) return null;
      if (current.r === end.r && current.c === end.c) return parent;

      const ns = neighbors(current).reverse();
      for (const next of ns) {
        const nk = key(next.r, next.c);
        if (!seen.has(nk)) {
          seen.add(nk);
          parent.set(nk, ck);
          stack.push(next);
        }
      }
    }
    return false;
  }

  async function drawPath(parent) {
    if (!parent) return;
    const path = new Set();
    let current = key(end.r, end.c);
    const startKey = key(start.r, start.c);

    while (current !== startKey) {
      path.add(current);
      current = parent.get(current);
      if (!current) break;
      await ALVIATools.sleep(Math.max(25, speed() * .65));
      render({ path });
    }
    path.add(startKey);
    render({ path });
  }

  async function play() {
    if (running) return;
    running = true;
    stop = false;
    playButton.innerHTML = "■ <span>Stop</span>";

    let parent = algorithm === "bfs" ? await bfs() : await dfs();
    if (parent === false) {
      render();
      window.setTimeout(() => alert("No path exists between the selected Start and End nodes."), 10);
    } else if (parent) {
      await drawPath(parent);
    }

    running = false;
    stop = false;
    playButton.innerHTML = "▶ <span>Play</span>";
  }

  function reset() {
    if (running) stop = true;
    walls = new Set();
    render();
    playButton.innerHTML = "▶ <span>Play</span>";
  }

  function setAlgorithm(next) {
    algorithm = next;
    title.textContent = meta[next].title;
    description.textContent = meta[next].description;
    document.querySelectorAll(".algorithm-option").forEach(b => b.classList.toggle("active", b.dataset.algorithm === next));
    render();
  }

  document.querySelectorAll(".algorithm-option").forEach(b => b.onclick = () => setAlgorithm(b.dataset.algorithm));
  document.querySelectorAll(".tool-button").forEach(b => {
    b.onclick = () => {
      tool = b.dataset.tool;
      document.querySelectorAll(".tool-button").forEach(x => x.classList.toggle("active", x === b));
    };
  });

  document.getElementById("clearWallsButton").onclick = () => {
    if (running) return;
    walls.clear();
    render();
  };
  document.getElementById("playButton").onclick = play;
  document.getElementById("resetButton").onclick = reset;
  slider.oninput = () => speedOutput.textContent = `${slider.value}ms`;

  buildGrid();
});
