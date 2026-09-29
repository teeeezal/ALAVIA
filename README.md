# ALVIA — DSA Algorithm Visualizer

> An interactive web-based visualizer for understanding and exploring fundamental Data Structures and Algorithms through step-by-step animations.

## 🌐 Live Demo

**[Visit ALVIA — Live Website](https://teeeezal.github.io/ALVIA/)**

---

## 📌 About the Project

**ALVIA** is an interactive **Data Structures and Algorithms (DSA) Visualizer** developed as a Semester 3 university project.

The primary objective of the project is to provide a visual and interactive way to understand how common algorithms operate. Instead of relying solely on source code or theoretical explanations, ALVIA represents algorithmic operations through animations, allowing users to observe comparisons, swaps, searches, traversals, and pathfinding processes directly.

The project is completely browser-based and does not require a backend server or external framework.

---

## 🎯 Objectives

- Provide an interactive environment for learning fundamental DSA concepts.
- Visualize algorithm execution step by step.
- Allow users to interact with input data.
- Demonstrate the behavior of different algorithms through animation.
- Provide a simple and accessible interface for students learning DSA.
- Connect theoretical algorithmic concepts with practical visual representation.

---

## 🚀 Features

### 1. Sorting Visualizer

ALVIA supports the following sorting algorithms:

- **Bubble Sort**
- **Insertion Sort**
- **Selection Sort**
- **Merge Sort**
- **Quick Sort**

Users can:

- Generate and modify arrays.
- Add new elements using **Push**.
- Remove elements using **Pop**.
- Increase or decrease individual element values.
- Randomize the array.
- Adjust visualization speed.
- Start and reset the visualization.
- Select different sorting algorithms.
- View algorithm theory and complexity.
- Explore use cases and applications.
- View implementations in **C, C++, Python, and Java**.
- Read a fun fact related to the algorithm.

The sorting visualization uses a book/library-inspired interface to make the process more intuitive.

---

### 2. Searching Visualizer

The searching module includes:

- **Linear Search**
- **Binary Search**

Users can:

- Enter a target value.
- Modify the array.
- Add new elements using **Push**.
- Remove elements using **Pop**.
- Increase or decrease individual element values.
- Randomize the array.
- Adjust visualization speed.
- Start and reset the visualization.
- Observe the search process through animation.
- View algorithm theory and complexity.
- Explore use cases and applications.
- View implementations in **C, C++, Python, and Java**.
- Read a fun fact related to the algorithm.

---

### 3. Pathfinder Visualizer

The pathfinding module provides visualizations for:

- **Breadth-First Search (BFS)**
- **Depth-First Search (DFS)**

Users can:

- Select BFS or DFS.
- Define a starting point.
- Define an ending point.
- Add and remove walls on the grid.
- Adjust animation speed.
- Start and reset the visualization.
- Watch the traversal process step by step.
- Observe the resulting path.
- View algorithm theory and complexity.
- Explore use cases and applications.
- View implementations in **C, C++, Python, and Java**.
- Read a fun fact related to the algorithm.

---

## 🎨 Design

ALVIA follows a custom visual design based on the project's design reference.

The interface uses:

- A warm **peach background**.
- Bold **black structural borders**.
- Rounded pill-shaped buttons and navigation elements.
- Flat, colorful cards.
- **Alfa Slab One** for display headings.
- **Manrope** for body text and interface elements.
- Line-art inspired visual elements and illustrations.
- Generous whitespace and clean layouts.
- No heavy shadows or gradients.

The landing page and each visualizer maintain the same overall design language while using their own visual themes and small animated elements.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure and page layout |
| CSS3 | Styling, responsive layout, and animations |
| JavaScript | Algorithm implementation and visualization logic |
| SVG | Logo and visual assets |
| Google Fonts | Alfa Slab One and Manrope typography |
| GitHub Pages | Deployment and hosting |

The project does not require any external framework, backend, database, or package installation.

---

## 🧠 Algorithms Implemented

### Sorting

| Algorithm | Average Time Complexity | Space Complexity |
|---|---:|---:|
| Bubble Sort | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(1) |
| Selection Sort | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(log n)* |

\*Average auxiliary space for the recursive implementation.

### Searching

| Algorithm | Time Complexity | Requirement |
|---|---:|---|
| Linear Search | O(n) | No sorting required |
| Binary Search | O(log n) | Sorted data |

### Pathfinding

| Algorithm | Time Complexity | Primary Concept |
|---|---:|---|
| BFS | O(V + E) | Level-order traversal |
| DFS | O(V + E) | Depth-first traversal |

---

## 🎮 Controls

### Sorting & Searching

- **Play** — Start the visualization.
- **Reset** — Restore the initial state.
- **Speed / Velocity** — Control animation speed.
- **Push** — Add an element.
- **Pop** — Remove an element.
- **Randomize** — Generate a new array.
- **Element Controls** — Modify individual values.

### Pathfinder

- **Play** — Start traversal and pathfinding.
- **Reset** — Restore the grid.
- **Speed** — Control animation speed.
- **Start** — Set the starting node.
- **End** — Set the destination node.
- **Wall** — Add or remove obstacles from the grid.

---

## 📂 Project Structure

```text
ALVIA/
│
├── index.html
├── sorting.html
├── searching.html
├── pathfinder.html
├── README.md
│
├── assets/
│   └── alvia-logo.svg
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    └── data.js
```

---

## 💻 Running the Project Locally

ALVIA is a static web application and can be run without installing any dependencies.

### Clone the repository

```bash
git clone https://github.com/teeeezal/ALVIA.git
```

### Navigate to the project

```bash
cd ALVIA
```

### Run the project

Open `index.html` directly in a browser, or use a local development server such as **VS Code Live Server**.

No build step or package installation is required.

---

## 🌐 GitHub Pages Deployment

ALVIA is deployed using **GitHub Pages**.

The live project is available at:

**https://teeeezal.github.io/ALVIA/**

To deploy your own version:

1. Fork or clone the repository.
2. Open the repository on GitHub.
3. Navigate to:

```text
Settings → Pages
```

4. Under **Build and deployment**, select:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

5. Save the configuration.
6. GitHub Pages will generate the website.

---

## 📚 Educational Purpose

ALVIA was developed as an academic project to demonstrate the practical implementation and visualization of fundamental algorithms covered in Data Structures and Algorithms coursework.

The project focuses on making algorithm execution easier to observe and understand through interactive visual feedback.

It is intended primarily as a learning and demonstration tool for students studying DSA.

---

## 🔮 Future Enhancements

Potential future improvements include:

- Binary Search Tree visualization
- Linked List visualization
- Stack and Queue visualization
- Graph traversal visualization
- Dijkstra's Algorithm
- A* Pathfinding
- Algorithm complexity indicators
- Step-by-step execution controls
- Algorithm explanations and pseudocode
- Dark mode
- Improved mobile responsiveness
- Additional sorting and searching algorithms

---

## 👩‍💻 Author

**Tejal Narwal**

B.Tech Computer Science and Engineering  
Semester 3

GitHub: **[teeeezal](https://github.com/teeeezal)**

LinkedIn: **[tejalnarwal](https://www.linkedin.com/in/tejalnarwal/)**

---

## 📄 License

This project was developed for educational and academic purposes.

You are welcome to explore the source code and use the implementation as a learning reference.

---

## 🔗 Links

- **Live Website:** https://teeeezal.github.io/ALVIA/
- **GitHub Repository:** https://github.com/teeeezal/ALVIA
- **GitHub Profile:** https://github.com/teeeezal
- **LinkedIn:** https://www.linkedin.com/in/tejalnarwal/

---

**Made by Tejal Narwal · 3rd Semester DSA Project**
