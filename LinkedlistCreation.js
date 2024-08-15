// creation of linked list

class Node {
	constructor(element)
	{
		this.element = element;
		this.next = null
	}
}

class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }
    add(element)
    {
    	var node = new Node(element);
    	var current;
    	if (this.head == null)
    		this.head = node;
    	else {
    		current = this.head;
    		while (current.next) {
    			current = current.next;
    		}
    		current.next = node;
    	}
    	this.size++;
    }
    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        console.log(str);
    }
}

var ll = new LinkedList();
ll.add(100);
ll.add(200);
ll.add(300);
console.log(ll);
ll.printList();
