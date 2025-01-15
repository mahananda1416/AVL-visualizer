#Project Overview

This project demonstrates the implementation of insertion and deletion operations in an AVL tree, a self-balancing binary search tree (BST). It showcases how the AVL tree maintains balance using rotations (single and double) to ensure efficient performance with a time complexity of O(log n).

#Features

Insertion: Adds a new node to the tree and rebalances it if the balance factor is violated.

Deletion: Removes a node from the tree and rebalances it to maintain AVL properties.

Rotations: Implements single (left, right) and double (left-right, right-left) rotations for rebalancing.

Visual Demonstration: Step-by-step explanation of balancing with rotation visualizations.

#Steps to Run

Clone the repository (if applicable):

git clone <https://github.com/mahananda1416/AVL-visualizer>

Open the project folder in your preferred IDE.

Compile and run the main Java file:

javac Main.java
java Main

Follow the instructions in the terminal or interface to perform insertion and deletion operations.

#How It Works

Insertion

A node is added following the BST rules.

Balance factors of nodes are calculated.

Rotations are applied if the balance factor becomes greater than 1 or less than -1.

Deletion

A node is removed following the BST rules.

Balance factors of nodes are recalculated.

Rotations are applied to restore balance if needed.

Rotations

Single Rotation: Handles LL and RR imbalances.

Double Rotation: Handles LR and RL imbalances.

