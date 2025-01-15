class AVLNode {
    constructor(value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    getBF(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    insert(node, value) {
        if (!node) {
            console.log(`Inserting new node with value: ${value}`);
            return new AVLNode(value);
        }
        if (value < node.value) {
            node.left = this.insert(node.left, value);
        } else if (value > node.value) {
            node.right = this.insert(node.right, value);
        } else {
            return node; // Duplicate values are not allowed
        }

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const balance = this.getBF(node);

        // LL
        if (balance > 1 && value < node.left.value) {
            return this.rightRotate(node);
        }
        // RR
        if (balance < -1 && value > node.right.value) {
            return this.leftRotate(node);
        }
        // LR
        if (balance > 1 && value > node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        // RL
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }

    delete(node, value) {
        if (!node) {
            console.log(`Value ${value} not found for deletion.`);
            return node;
        }
        if (value < node.value) {
            node.left = this.delete(node.left, value);
        } else if (value > node.value) {
            node.right = this.delete(node.right, value);
        } else {
            // Node with only one child or no child
            if (!node.left || !node.right) {
                const temp = node.left ? node.left : node.right;
                return temp; 
            } else {
                // Node with two children
                const temp = this.getMinValueNode(node.right);
                node.value = temp.value; 
                node.right = this.delete(node.right, temp.value);
            }
        }

        // Update height of the current node
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const balance = this.getBF(node);

        // Balancing the tree
        // LL
        if (balance > 1 && this.getBF(node.left) >= 0) {
            return this.rightRotate(node);
        }
        // LR
        if (balance > 1 && this.getBF(node.left) < 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        // RR
        if (balance < -1 && this.getBF(node.right) <= 0) {
            return this.leftRotate(node);
        }
        // RL
        if (balance < -1 && this.getBF(node.right) > 0) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }

    getMinValueNode(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    add(value) {
        this.root = this.insert(this.root, value);
        this.refreshTree();
    }

    remove(value) {
        this.root = this.delete(this.root, value);
        this.refreshTree();
    }

    visualizeTree(node, container) {
        if (!node) return;
    
        // Node creation
        const div = document.createElement('div');
        div.className = "node";
        div.innerHTML = node.value;
        container.appendChild(div);
    
        if (node.left || node.right) {
            const children = document.createElement('div');
            children.className = "children";
            container.appendChild(children);
    
            if (node.left) {
                const left = document.createElement('div');
                left.className = "child left";
                children.appendChild(left);
                this.visualizeTree(node.left, left);

                const link = document.createElement('div');
                link.className = "link left";
                left.appendChild(link);
            }
    
            if (node.right) {
                const right = document.createElement('div');
                right.className = "child right";
                children.appendChild(right);
                this.visualizeTree(node.right, right);

                const link = document.createElement('div');
                link.className = "link right";
                right.appendChild(link);
            }
        }
    }
    refreshTree() {
        const treeContainer = document.getElementById('treeContainer');
        treeContainer.innerHTML = '';
        const tree = document.createElement('div');
        tree.className = "tree";
        treeContainer.appendChild(tree);
        this.visualizeTree(this.root, tree);
    }
}

const tree = new AVLTree();
const inputField = document.getElementById("valueInput");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");
const treeContainer = document.getElementById("treeContainer");

addButton.addEventListener("click", () => {
    const value = parseInt(inputField.value);
    if (!isNaN(value)) {
        console.log('Inserting value:', value);
        tree.add(value);
    } else {
        console.log("Invalid input");
    }
    inputField.value = "";
});

deleteButton.addEventListener("click", () => {
    const value = parseInt(inputField.value);
    if (!isNaN(value)) {
        console.log('Deleting value:', value);
        tree.remove(value);
    } else {
        console.log("Invalid input");
    }
    inputField.value = "";
});