const $ = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));

function makeValues(n=14){ return Array.from({length:n},()=>Math.floor(Math.random()*90)+10); }

function renderArray(values, container, active=[], cls=""){
  container.innerHTML="";
  const max=Math.max(...values,1);
  values.forEach((v,i)=>{
    const b=document.createElement("div");
    b.className="bar "+cls+(active.includes(i)?" active":"");
    b.style.height=`${Math.max(38,(v/max)*240)}px`;
    b.textContent=v;
    b.dataset.index=i;
    container.appendChild(b);
  });
}

function editor(values, container, onChange){
  container.innerHTML="";
  values.forEach((v,i)=>{
    const input=document.createElement("input");
    input.type="number"; input.value=v; input.title=`Edit element ${i+1}`;
    input.addEventListener("change",()=>onChange(i,clamp(Number(input.value)||1,1,99)));
    container.appendChild(input);
  });
}

async function bubble(a,draw,delay){
  for(let i=0;i<a.length-1;i++) for(let j=0;j<a.length-i-1;j++){
    draw([j,j+1]); await sleep(delay);
    if(a[j]>a[j+1]) [a[j],a[j+1]]=[a[j+1],a[j]];
    draw([j,j+1]); await sleep(delay/2);
  }
}
async function insertion(a,draw,delay){
  for(let i=1;i<a.length;i++){let j=i,key=a[i];draw([i]);await sleep(delay);
    while(j>0&&a[j-1]>key){a[j]=a[j-1];j--;draw([j,j+1]);await sleep(delay)}
    a[j]=key;draw([j]);await sleep(delay/2);
  }
}
async function selection(a,draw,delay){
  for(let i=0;i<a.length-1;i++){let m=i;
    for(let j=i+1;j<a.length;j++){draw([m,j]);await sleep(delay);if(a[j]<a[m])m=j}
    [a[i],a[m]]=[a[m],a[i]];draw([i,m]);await sleep(delay);
  }
}
async function mergeSort(a,draw,delay,l=0,r=a.length-1){
  if(l>=r)return; const m=Math.floor((l+r)/2);
  await mergeSort(a,draw,delay,l,m); await mergeSort(a,draw,delay,m+1,r);
  const left=a.slice(l,m+1),right=a.slice(m+1,r+1);let i=0,j=0,k=l;
  while(i<left.length&&j<right.length){draw([k]);await sleep(delay);
    a[k++]=left[i]<=right[j]?left[i++]:right[j++];
  }
  while(i<left.length)a[k++]=left[i++];
  while(j<right.length)a[k++]=right[j++];
  draw(Array.from({length:r-l+1},(_,x)=>l+x));await sleep(delay);
}
async function quick(a,draw,delay,l=0,r=a.length-1){
  if(l>=r)return; let p=a[r],i=l;
  for(let j=l;j<r;j++){draw([j,r]);await sleep(delay);if(a[j]<p){[a[i],a[j]]=[a[j],a[i]];i++}}
  [a[i],a[r]]=[a[r],a[i]];draw([i]);await sleep(delay);
  await quick(a,draw,delay,l,i-1);await quick(a,draw,delay,i+1,r);
}

function codeCards(target,codes){
  target.innerHTML="";
  Object.entries(codes).forEach(([lang,code])=>{
    const card=document.createElement("article");card.className="code-block";
    card.innerHTML=`<h3>${lang}</h3><pre></pre>`;card.querySelector("pre").textContent=code;target.appendChild(card);
  });
}

function initSorting(){
  let values=makeValues(14), running=false;
  const alg=$("sortAlgorithm"), array=$("sortArray"), editorEl=$("sortEditor");
  const render=(active=[])=>{renderArray(values,array,active);editor(values,editorEl,(i,v)=>{values[i]=v;render()})};
  const update=()=>{const n=Number($("count").value);while(values.length<n)values.push(...makeValues(1));values=values.slice(0,n);$("countOut").textContent=n;render()};
  $("count").addEventListener("input",update);
  $("speed").addEventListener("input",e=>$("speedOut").textContent=e.target.value+"ms");
  $("sortRandom").onclick=()=>{values=makeValues(values.length);render()};
  $("sortPush").onclick=()=>{if(values.length<30)values.push(Math.floor(Math.random()*90)+10);$("count").value=values.length;$("countOut").textContent=values.length;render()};
  $("sortPop").onclick=()=>{if(values.length>5)values.pop();$("count").value=values.length;$("countOut").textContent=values.length;render()};
  $("sortReset").onclick=()=>{values=makeValues(Number($("count").value));$("sortStatus").textContent="Reset to a fresh array.";render()};
  alg.onchange=()=>{
    const d=SORT_INFO[alg.value];$("complexityTitle").textContent=alg.value;$("bestCase").textContent=d.best;$("avgCase").textContent=d.average;$("worstCase").textContent=d.worst;$("spaceCase").textContent=d.space;$("useCase").textContent=d.use;$("sortFact").textContent=d.fact;codeCards($("sortCode"),d.codes)
  };
  $("sortPlay").onclick=async()=>{
    if(running)return;running=true;$("sortStatus").textContent=`Running ${alg.value}…`;
    const d=Number($("speed").value), draw=(active)=>render(active);
    if(alg.value==="Bubble Sort")await bubble(values,draw,d);else if(alg.value==="Insertion Sort")await insertion(values,draw,d);else if(alg.value==="Selection Sort")await selection(values,draw,d);else if(alg.value==="Merge Sort")await mergeSort(values,draw,d);else await quick(values,draw,d);
    render();running=false;$("sortStatus").textContent=`${alg.value} complete.`;
  };
  alg.onchange();render();
}

function initSearching(){
  let values=makeValues(14),running=false;
  const alg=$("searchAlgorithm"),array=$("searchArray"),ed=$("searchEditor");
  const render=(active=[])=>{renderArray(values,array,active);editor(values,ed,(i,v)=>{values[i]=v;render()})};
  const updateSpeed=e=>$("searchSpeedOut").textContent=e.target.value+"ms";
  $("searchSpeed").addEventListener("input",updateSpeed);
  $("searchRandom").onclick=()=>{values=makeValues(values.length);render()};
  $("searchPush").onclick=()=>{if(values.length<30)values.push(Math.floor(Math.random()*90)+10);render()};
  $("searchPop").onclick=()=>{if(values.length>5)values.pop();render()};
  $("searchReset").onclick=()=>{values=makeValues(values.length);$("searchStatus").textContent="Reset to a fresh array.";render()};
  $("searchSort").onclick=()=>{values.sort((a,b)=>a-b);render();$("searchStatus").textContent="Array sorted. Binary Search is ready."};
  alg.onchange=()=>{
    const d=SEARCH_INFO[alg.value];$("searchComplexityTitle").textContent=alg.value;$("sBest").textContent=d.best;$("sAvg").textContent=d.average;$("sWorst").textContent=d.worst;$("searchUseTitle").textContent=alg.value;$("searchUse").textContent=d.use;$("searchFact").textContent=d.fact;codeCards($("searchCode"),d.codes)
  };
  $("searchPlay").onclick=async()=>{
    if(running)return;running=true;const target=Number($("target").value),delay=Number($("searchSpeed").value);$("searchStatus").textContent=`Looking for ${target}…`;
    if(alg.value==="Linear Search"){
      for(let i=0;i<values.length;i++){render([i]);await sleep(delay);if(values[i]===target){render([i]);$("searchStatus").textContent=`Found ${target} at index ${i}.`;running=false;return}}
    }else{
      let l=0,r=values.length-1;
      if(values.some((v,i)=>i>0&&v<values[i-1])){ $("searchStatus").textContent="Binary Search needs a sorted array. Sort it first.";running=false;return}
      while(l<=r){let m=Math.floor((l+r)/2);render([m]);await sleep(delay);if(values[m]===target){$("searchStatus").textContent=`Found ${target} at index ${m}.`;running=false;return}if(values[m]<target)l=m+1;else r=m-1}
    }
    $("searchStatus").textContent=`${target} was not found.`;running=false;
  };
  alg.onchange();render();
}

function initPathfinder(){
  const rows=20,cols=24;let start=rows*cols-cols+2,end=cols-3,mode="wall",running=false;
  const grid=$("pathGrid");let cells=[];
  function idx(r,c){return r*cols+c}
  function reset(){grid.innerHTML="";cells=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const cell=document.createElement("div");cell.className="cell";cell.dataset.i=idx(r,c);cell.onpointerdown=()=>paint(cell);cell.onpointerenter=e=>{if(e.buttons)paint(e.currentTarget)};grid.appendChild(cell);cells.push(cell)}cells[start].classList.add("start");cells[end].classList.add("end")}
  function paint(cell){if(running)return;const i=Number(cell.dataset.i);if(mode==="start"){if(i===end)return;cells[start].classList.remove("start");start=i;cell.classList.remove("wall");cell.classList.add("start");mode="wall"}else if(mode==="end"){if(i===start)return;cells[end].classList.remove("end");end=i;cell.classList.remove("wall");cell.classList.add("end");mode="wall"}else if(i!==start&&i!==end)cell.classList.toggle("wall")}
  $("setStart").onclick=()=>{mode="start";$("pathStatus").textContent="Click a cell to place the start node."};
  $("setEnd").onclick=()=>{mode="end";$("pathStatus").textContent="Click a cell to place the end node."};
  $("clearWalls").onclick=()=>cells.forEach(c=>c.classList.remove("wall","visited","path"));
  $("mazeWalls").onclick=()=>{cells.forEach(c=>c.classList.remove("wall","visited","path"));cells.forEach((c,i)=>{if(i!==start&&i!==end&&Math.random()<.25)c.classList.add("wall")})};
  $("pathSpeed").addEventListener("input",e=>$("pathSpeedOut").textContent=e.target.value+"ms");
  $("pathReset").onclick=()=>{start=rows*cols-cols+2;end=cols-3;reset();$("pathStatus").textContent="Grid reset."};
  $("pathPlay").onclick=async()=>{
    if(running)return;running=true;cells.forEach(c=>c.classList.remove("visited","path"));
    const q=[start],seen=new Set([start]),parent=new Map();let order=[];
    const bfs=$("pathAlgorithm").value==="BFS";
    while(q.length){const u=bfs?q.shift():q.pop();order.push(u);if(u===end)break;const r=Math.floor(u/cols),c=u%cols;
      const ns=[[r-1,c],[r+1,c],[r,c-1],[r,c+1]];
      for(const [nr,nc] of ns){if(nr<0||nr>=rows||nc<0||nc>=cols)continue;const v=idx(nr,nc);if(seen.has(v)||cells[v].classList.contains("wall"))continue;seen.add(v);parent.set(v,u);q.push(v)}
    }
    const d=Number($("pathSpeed").value);$("pathStatus").textContent=`${$("pathAlgorithm").value} is exploring…`;
    for(const u of order){if(u!==start&&u!==end){cells[u].classList.add("visited");await sleep(d)}}
    if(seen.has(end)){let cur=end,path=[];while(cur!==start){path.push(cur);cur=parent.get(cur)}path.reverse();for(const u of path){cells[u].classList.remove("visited");cells[u].classList.add("path");await sleep(Math.max(20,d/2))}$("pathStatus").textContent="Path found."}else $("pathStatus").textContent="No path exists with these walls.";
    running=false;
  };
  reset();
  $("pathCode") && codeCards($("pathCode"),PATH_CODES);
  $("pathFact").textContent="BFS explores in layers, which is why it can guarantee a shortest path when every edge has equal cost.";
}

document.addEventListener("DOMContentLoaded",()=>{
  const page=document.body.dataset.page;
  if(page==="sorting")initSorting();
  if(page==="searching")initSearching();
  if(page==="pathfinder")initPathfinder();
});