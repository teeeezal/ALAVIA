const SORT_INFO = {
  "Bubble Sort": {
    best:"O(n)", average:"O(n²)", worst:"O(n²)", space:"O(1)",
    use:"Good for teaching and tiny or nearly sorted inputs. Avoid it for large unsorted datasets.",
    fact:"Bubble Sort gets its name because larger elements 'bubble' toward the end of the list.",
    codes:{
      C:`void bubbleSort(int a[], int n) {\n  for (int i=0;i<n-1;i++)\n    for (int j=0;j<n-i-1;j++)\n      if (a[j] > a[j+1]) {\n        int t=a[j]; a[j]=a[j+1]; a[j+1]=t;\n      }\n}`,
      "C++":`void bubbleSort(vector<int>& a) {\n  for (int i=0;i<a.size()-1;i++)\n    for (int j=0;j<a.size()-i-1;j++)\n      if (a[j] > a[j+1]) swap(a[j],a[j+1]);\n}`,
      Python:`def bubble_sort(a):\n    for i in range(len(a)-1):\n        for j in range(len(a)-i-1):\n            if a[j] > a[j+1]:\n                a[j], a[j+1] = a[j+1], a[j]`,
      Java:`static void bubbleSort(int[] a) {\n  for(int i=0;i<a.length-1;i++)\n    for(int j=0;j<a.length-i-1;j++)\n      if(a[j]>a[j+1]) { int t=a[j]; a[j]=a[j+1]; a[j+1]=t; }\n}`
    }
  },
  "Insertion Sort": {
    best:"O(n)", average:"O(n²)", worst:"O(n²)", space:"O(1)",
    use:"Excellent for small or nearly sorted data and useful when values arrive incrementally.",
    fact:"Insertion Sort works much like sorting a hand of playing cards.",
    codes:{
      C:`void insertionSort(int a[], int n) {\n  for(int i=1;i<n;i++) {\n    int key=a[i], j=i-1;\n    while(j>=0 && a[j]>key) a[j+1]=a[j--];\n    a[j+1]=key;\n  }\n}`,
      "C++":`void insertionSort(vector<int>& a) {\n  for(int i=1;i<a.size();i++) {\n    int key=a[i], j=i-1;\n    while(j>=0 && a[j]>key) a[j+1]=a[j--];\n    a[j+1]=key;\n  }\n}`,
      Python:`def insertion_sort(a):\n    for i in range(1, len(a)):\n        key=a[i]; j=i-1\n        while j>=0 and a[j]>key:\n            a[j+1]=a[j]; j-=1\n        a[j+1]=key`,
      Java:`static void insertionSort(int[] a) {\n  for(int i=1;i<a.length;i++) {\n    int key=a[i], j=i-1;\n    while(j>=0 && a[j]>key) a[j+1]=a[j--];\n    a[j+1]=key;\n  }\n}`
    }
  },
  "Selection Sort": {
    best:"O(n²)", average:"O(n²)", worst:"O(n²)", space:"O(1)",
    use:"Useful when memory is tight and minimizing swaps matters. Usually avoid it for large data.",
    fact:"Selection Sort performs at most n−1 swaps, which can matter when writes are expensive.",
    codes:{
      C:`for(int i=0;i<n-1;i++) {\n  int m=i;\n  for(int j=i+1;j<n;j++) if(a[j]<a[m]) m=j;\n  int t=a[i]; a[i]=a[m]; a[m]=t;\n}`,
      "C++":`for(int i=0;i<a.size()-1;i++) {\n  int m=i;\n  for(int j=i+1;j<a.size();j++) if(a[j]<a[m]) m=j;\n  swap(a[i],a[m]);\n}`,
      Python:`for i in range(len(a)-1):\n    m=min(range(i,len(a)), key=a.__getitem__)\n    a[i],a[m]=a[m],a[i]`,
      Java:`for(int i=0;i<a.length-1;i++) {\n  int m=i;\n  for(int j=i+1;j<a.length;j++) if(a[j]<a[m]) m=j;\n  int t=a[i]; a[i]=a[m]; a[m]=t;\n}`
    }
  },
  "Merge Sort": {
    best:"O(n log n)", average:"O(n log n)", worst:"O(n log n)", space:"O(n)",
    use:"A strong general-purpose choice when predictable O(n log n) time and stability are useful.",
    fact:"Merge Sort is a classic example of divide and conquer: split, solve, then merge.",
    codes:{
      C:`void mergeSort(int a[], int l, int r) {\n  if(l>=r) return;\n  int m=(l+r)/2;\n  mergeSort(a,l,m); mergeSort(a,m+1,r);\n  // merge the two sorted halves\n}`,
      "C++":`void mergeSort(vector<int>& a,int l,int r) {\n  if(l>=r) return;\n  int m=(l+r)/2;\n  mergeSort(a,l,m); mergeSort(a,m+1,r);\n  // merge sorted halves\n}`,
      Python:`def merge_sort(a):\n    if len(a)<=1: return a\n    m=len(a)//2\n    left=merge_sort(a[:m]); right=merge_sort(a[m:])\n    return merge(left,right)`,
      Java:`static void mergeSort(int[] a,int l,int r) {\n  if(l>=r) return;\n  int m=(l+r)/2;\n  mergeSort(a,l,m); mergeSort(a,m+1,r);\n  // merge sorted halves\n}`
    }
  },
  "Quick Sort": {
    best:"O(n log n)", average:"O(n log n)", worst:"O(n²)", space:"O(log n)",
    use:"Very fast in practice with good pivot choices; avoid poor pivot strategies on adversarial inputs.",
    fact:"Quick Sort was developed by Tony Hoare in 1959 while working on machine translation.",
    codes:{
      C:`void quickSort(int a[], int l, int r) {\n  if(l>=r) return;\n  int p=a[r], i=l;\n  for(int j=l;j<r;j++) if(a[j]<p) { int t=a[i];a[i++]=a[j];a[j]=t; }\n  int t=a[i];a[i]=a[r];a[r]=t;\n  quickSort(a,l,i-1); quickSort(a,i+1,r);\n}`,
      "C++":`void quickSort(vector<int>& a,int l,int r) {\n  if(l>=r) return;\n  int p=a[r], i=l;\n  for(int j=l;j<r;j++) if(a[j]<p) swap(a[i++],a[j]);\n  swap(a[i],a[r]); quickSort(a,l,i-1); quickSort(a,i+1,r);\n}`,
      Python:`def quick_sort(a):\n    if len(a)<=1: return a\n    p=a[-1]\n    left=[x for x in a[:-1] if x<p]\n    right=[x for x in a[:-1] if x>=p]\n    return quick_sort(left)+[p]+quick_sort(right)`,
      Java:`static void quickSort(int[] a,int l,int r) {\n  if(l>=r) return;\n  int p=a[r],i=l;\n  for(int j=l;j<r;j++) if(a[j]<p) {int t=a[i];a[i++]=a[j];a[j]=t;}\n  int t=a[i];a[i]=a[r];a[r]=t;\n  quickSort(a,l,i-1); quickSort(a,i+1,r);\n}`
    }
  }
};

const SEARCH_INFO = {
  "Linear Search": {
    best:"O(1)", average:"O(n)", worst:"O(n)", use:"Small or unsorted collections; no preprocessing is required.",
    fact:"Linear Search is so simple that it is often the first search algorithm students implement.",
    codes:{
      C:`int linearSearch(int a[], int n, int target) {\n  for(int i=0;i<n;i++) if(a[i]==target) return i;\n  return -1;\n}`,
      "C++":`int linearSearch(vector<int>& a,int target) {\n  for(int i=0;i<a.size();i++) if(a[i]==target) return i;\n  return -1;\n}`,
      Python:`def linear_search(a,target):\n    for i,x in enumerate(a):\n        if x==target: return i\n    return -1`,
      Java:`static int linearSearch(int[] a,int target) {\n  for(int i=0;i<a.length;i++) if(a[i]==target) return i;\n  return -1;\n}`
    }
  },
  "Binary Search": {
    best:"O(1)", average:"O(log n)", worst:"O(log n)", use:"Large sorted arrays where repeatedly halving the search space is valuable.",
    fact:"Binary Search works because one comparison can eliminate roughly half the remaining candidates.",
    codes:{
      C:`int binarySearch(int a[], int n, int target) {\n  int l=0,r=n-1;\n  while(l<=r) { int m=l+(r-l)/2;\n    if(a[m]==target) return m;\n    if(a[m]<target) l=m+1; else r=m-1;\n  } return -1;\n}`,
      "C++":`int binarySearch(vector<int>& a,int target) {\n  int l=0,r=a.size()-1;\n  while(l<=r){ int m=l+(r-l)/2;\n    if(a[m]==target) return m;\n    if(a[m]<target) l=m+1; else r=m-1;\n  } return -1;\n}`,
      Python:`def binary_search(a,target):\n    l,r=0,len(a)-1\n    while l<=r:\n        m=(l+r)//2\n        if a[m]==target: return m\n        if a[m]<target: l=m+1\n        else: r=m-1\n    return -1`,
      Java:`static int binarySearch(int[] a,int target) {\n  int l=0,r=a.length-1;\n  while(l<=r){int m=l+(r-l)/2;\n    if(a[m]==target)return m;\n    if(a[m]<target)l=m+1;else r=m-1;\n  } return -1;\n}`
    }
  }
};

const PATH_CODES = {
  C:`// BFS\nqueue<int> q; q.push(start); visited[start]=true;\nwhile(!q.empty()) {\n  int u=q.front(); q.pop();\n  for(int v: adj[u]) if(!visited[v]) {\n    visited[v]=true; parent[v]=u; q.push(v);\n  }\n}\n\n// DFS\nstack<int> st; st.push(start);\nwhile(!st.empty()) {\n  int u=st.top(); st.pop();\n  if(visited[u]) continue; visited[u]=true;\n  for(int v: adj[u]) if(!visited[v]) { parent[v]=u; st.push(v); }\n}`,
  "C++":`// BFS\nqueue<int> q; q.push(start); visited[start]=true;\nwhile(!q.empty()) {\n  int u=q.front(); q.pop();\n  for(int v:adj[u]) if(!visited[v]) {\n    visited[v]=true; parent[v]=u; q.push(v);\n  }\n}\n\n// DFS\nstack<int> st; st.push(start);\nwhile(!st.empty()) {\n  int u=st.top(); st.pop();\n  if(visited[u]) continue; visited[u]=true;\n  for(int v:adj[u]) if(!visited[v]) { parent[v]=u; st.push(v); }\n}`,
  Python:`# BFS\nfrom collections import deque\nq=deque([start]); visited={start}\nwhile q:\n    u=q.popleft()\n    for v in graph[u]:\n        if v not in visited:\n            visited.add(v); parent[v]=u; q.append(v)\n\n# DFS\nstack=[start]; visited=set()\nwhile stack:\n    u=stack.pop()\n    if u in visited: continue\n    visited.add(u)\n    for v in graph[u]:\n        if v not in visited: parent[v]=u; stack.append(v)`,
  Java:`// BFS\nQueue<Integer> q=new ArrayDeque<>(); q.add(start); visited[start]=true;\nwhile(!q.isEmpty()) {\n  int u=q.remove();\n  for(int v:adj[u]) if(!visited[v]) {\n    visited[v]=true; parent[v]=u; q.add(v);\n  }\n}\n\n// DFS\nDeque<Integer> st=new ArrayDeque<>(); st.push(start);\nwhile(!st.isEmpty()) {\n  int u=st.pop(); if(visited[u]) continue; visited[u]=true;\n  for(int v:adj[u]) if(!visited[v]) { parent[v]=u; st.push(v); }\n}`
};