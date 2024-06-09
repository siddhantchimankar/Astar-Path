# A* Path Finding Algorithm Visualization

This project is a visual representation of the A* path finding algorithm, implemented using the p5.js library. The A* algorithm is a popular pathfinding algorithm used in various applications, such as video games, robotics, and routing systems. This implementation allows users to visualize the algorithm's step-by-step process in finding the shortest path between two points on a grid.

## Features

- Interactive grid with configurable dimensions
- Random generation of obstacles (walls) on the grid
- Real-time visualization of the algorithm's open set, closed set, and path
- Color-coded representation of different grid cell states (start, end, open set, closed set, path, and walls)
- Automatic path finding and termination when the solution is found or no solution exists

## Algorithm Overview

The A* algorithm is an informed search algorithm that combines the advantages of the Dijkstra's algorithm and the greedy best-first search algorithm. It finds the shortest path from a given start node to the end node by considering both the cost of reaching a node (g-cost) and an estimate of the remaining cost to reach the end node (h-cost).

The algorithm maintains two sets: an open set and a closed set. The open set contains the nodes that are yet to be evaluated, while the closed set contains the nodes that have already been evaluated. Initially, the start node is added to the open set.

In each iteration, the algorithm selects the node with the lowest f-cost (f-cost = g-cost + h-cost) from the open set. This node is then added to the closed set, and its neighboring nodes are evaluated and added to the open set if they satisfy certain conditions.

The process continues until the end node is reached or the open set becomes empty (indicating that no path exists). If the end node is found, the algorithm reconstructs the path by backtracking from the end node to the start node using the parent pointers.

## Implementation Details

The project is implemented using JavaScript and the p5.js library. The code is organized into the following main components:

1. **Global Variables**: Declarations of variables for grid dimensions, grid array, open set, closed set, start and end nodes, and path.
2. **Heuristic Function**: A heuristic function that calculates the estimated cost from a node to the end node using the Manhattan distance.
3. **Spot Class**: A class representing each cell in the grid, with properties for position, cost values, parent node, wall status, and methods for showing the cell, checking validity, and adding neighboring cells.
4. **Setup Function**: Initializes the canvas, creates the grid, adds neighbors to each cell, and sets the start and end nodes.
5. **Draw Function**: The main loop of the program, responsible for finding the best candidate node, updating the open and closed sets, handling neighbor nodes, reconstructing the path, and rendering the grid with color-coded cells.

## How to Run

To run the project, simply open the HTML file in a web browser that supports JavaScript and the p5.js library. The grid will be displayed on the canvas, and the algorithm will start running automatically, visualizing the step-by-step process of finding the shortest path.

## Conclusion

This project provides an interactive and visually appealing way to understand the A* path finding algorithm. By visualizing the algorithm's progress, users can gain insights into how it explores the grid, evaluates nodes, and finds the optimal path. This implementation can be useful for educational purposes, algorithm demonstrations, or as a starting point for incorporating path finding algorithms into various applications.