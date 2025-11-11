export function linkedList() {
  let head = null;
  let tail = null;
  const append = (value) => {
    const node = Node(value);
    if (head === null) {
      head = node;
      tail = node;
    } else if (head.nextNode === null) {
      head.nextNode = node;
      tail = node;
    } else {
      tail.nextNode = node;
      tail = node;
    }
  };

  const prepend = (value) => {
    if (head === null) append(value);
    else {
      const node = Node(value);
      node.nextNode = head;
      head = node;
    }
  };

  const size = () => {
    if (head === null) return 0;
    let count = 0;
    let curr = head;
    while (curr.nextNode !== null) {
      count++;
      curr = curr.nextNode;
    }
    count++;
    return count;
  };

  const at = (index) => {
    if (head === null) return null;
    if (index > size() - 1) return "Doesn't exist";
    let curr = head;
    for (let indx = 0; indx < index; indx++) {
      curr = curr.nextNode;
    }
    return curr;
  };

  const pop = () => {
    if (head === null) return;
    if (head.nextNode === null) {
      head = null;
      tail = null;
      return;
    }
    let curr = head;
    let prev = curr;
    while (curr.nextNode !== null) {
      prev = curr;
      curr = curr.nextNode;
    }
    prev.nextNode = null;
    tail = prev;
  };

  const contains = (value) => {
    if (head === null) return false;
    let curr = head;
    if (typeof curr.value === "object") {
      while (curr.nextNode !== null) {
        if (Object.values(curr.value).some((val) => val === value)) {
          return true;
        }
        curr = curr.nextNode;
      }
      if (Object.values(curr.value).some((val) => val === value)) {
        return true;
      }
      return false;
    } else {
      while (curr.nextNode !== null) {
        if (curr.value === value) {
          return true;
        }
        curr = curr.nextNode;
      }
      //Check last node
      if (curr.value === value) {
        return true;
      }
      return false;
    }
  };

  const find = (value) => {
    if (head === null) return null;
    let curr = head;
    let count = 0;
    if (typeof curr.value === "object") {
        while (curr.nextNode !== null) {
            for (const val of Object.values(curr.value)) {
                if (val === value) return count;
            }
            count++;
            curr = curr.nextNode;
        }
        for (const val of Object.values(curr.value)) {
                if (val === value) return count;
        }
        return null;
    } else {
      while (curr.nextNode !== null) {
        if (curr.value === value) {
          return count;
        }
        count++;
        curr = curr.nextNode;
      }
      //Check last node
      if (curr.value === value) {
        return count;
      }
      return null;
    }
  };

  const insertAt = (value, index) => {
    if (head === null) {
      append(value);
      return;
    }
    if (index >= size() - 1) {
      append(value);
      return;
    }
    const node = Node(value);
    let curr = head;
    let prev = curr;
    for (let indx = 0; indx < index; indx++) {
      prev = curr;
      curr = curr.nextNode;
    }
    prev.nextNode = node;
    node.nextNode = curr;
  };

  const removeAt = (index) => {
    if (head === null) return null;
    if (index > size() - 1) return null;
    if (index === size() - 1) {
      pop();
      return;
    }
    let curr = head;
    let prev = curr;
    if (index === 0) {
      head = head.nextNode;
      curr.nextNode = null;
      return;
    }
    for (let indx = 0; indx < index; indx++) {
      prev = curr;
      curr = curr.nextNode;
    }
    prev.nextNode = curr.nextNode;
    curr.nextNode = null;
  };

  const toString = () => {
    let message = "";
    if (head === null) {
      return "null";
    }
    let curr = head;
    while (curr.nextNode !== null) {
      message += `(${curr.value}) -> `;
      curr = curr.nextNode;
    }
    message += `(${curr.value}) -> `;
    message += " null";
    return message;
  };

  const headNode = () => {
    return head;
  };
  const tailNode = () => {
    return tail;
  };
  return {
    headNode,
    append,
    toString,
    prepend,
    tailNode,
    size,
    pop,
    at,
    contains,
    find,
    insertAt,
    removeAt,
  };
}

function Node(value = null, nextNode = null) {
  return { value, nextNode };
}
