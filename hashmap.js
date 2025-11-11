import { linkedList } from "./linkedlist.js";

class Hashmap {
    constructor() {
        this.loadFactor = 0.75
        this.capacity = 16
        this.buckets = [];
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    set(key, value) {
        const hashIndex = this.hash(key) % this.capacity;
        const data = {key,value}
        let bucket = this.buckets[hashIndex]
        if (bucket === undefined || bucket === "") {
            const list = linkedList();
            list.append(data);
            this.buckets[hashIndex] = list
        } else if (bucket.contains(data.key)) {
            let listIndex = bucket.find(data.key);
            bucket.removeAt(listIndex)
            bucket.insertAt(data, listIndex);
        } else {
            bucket.append(data);
        }

    }

    get(key) {
        const bucket = this.getBucket(key);
        if (bucket === undefined) return null;
        const keyObj = { key: key }
        const listIndex = bucket.find(keyObj.key)
        return bucket.at(listIndex).value.value;
    }

    getBucket(key) {
        const hashIndex = this.hash(key) % this.capacity;
        return this.buckets[hashIndex];
    }

    has(key) {
        return this.get(key) ? true : false;
    }
}

const hash = new Hashmap();
hash.set("grape", 'red')
hash.set("hat", 'blue')
console.log(hash.buckets[11].headNode())
console.log(hash.has("blue"))
// const list = linkedList();
// const data = {key:"red", value: "sarah"}
// list.append(data);

// console.log(list.find("red"))
