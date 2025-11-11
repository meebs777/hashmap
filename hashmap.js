import { linkedList } from "./linkedlist.js";

class HashMap {
    constructor() {
        this.loadFactor = 0.75
        this.capacity = 16
        this.buckets = [];
    }

    hash(key) {
        let hashCode = 0;
        let index = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            index = hashCode % this.capacity;
        }

        return {hashCode, index};
    }

    set(key, value) {
        if (this.length() >= this.loadFactor * this.capacity) {
            this.capacity *= 2;
            const entries = this.entries();
            this.clear();
            for (let index = 0; index < entries.length; index++){
                this.set(entries[index][0], entries[index][1]);
            }
        }
        const hashIndex = this.hash(key).index
        const data = {key,value}
        let bucket = this.buckets[hashIndex]
        if (bucket === undefined || bucket === null) {
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
        if (bucket === undefined || bucket === null) return null;
        const keyObj = { key: key }
        const listIndex = bucket.find(keyObj.key)
        return bucket.at(listIndex)?.value?.value || null;
    }

    getBucket(key) {
        const hashIndex = this.hash(key).index;
        return this.buckets[hashIndex];
    }

    has(key) {
        return this.get(key) ? true : false;
    }

    remove(key) {
        if (!this.has(key)) return false;
        const bucket = this.getBucket(key);
        if (bucket.size() === 1) {
            bucket.pop()
            return true;
        } else {
            const keyObj = { key: key };
            const listIndex = bucket.find(keyObj.key);
            bucket.removeAt(listIndex);
        }
        return true;
    }

    length() {
        const arraySize = this.capacity;
        let count = 0;
        for (let index = 0; index < arraySize; index++) {
            if (!this.buckets[index]) {
                continue;
            }
            count += this.buckets[index].size();
        }
        return count;
    }

    clear() {
        const arraySize = this.capacity;
        for (let index = 0; index < arraySize; index++) {
            if (!this.buckets[index]) {
                continue;
            }
            this.buckets[index] = null;
        }
    }

    keys() {
        const arraySize = this.capacity;
        const keys = []
        for (let index = 0; index < arraySize; index++) {
            if (!this.buckets[index]) {
                continue;
            }
            const size = this.buckets[index].size();
            if (size === 1) {
                keys.push(this.buckets[index].headNode().value.key);
                continue;
            } else {
                for (let listIndex = 0; listIndex < size; listIndex++) {
                    keys.push(this.buckets[index].at(listIndex).value.key);
                }
            }
        }
        return keys;
    }

    values() {
        const arraySize = this.capacity;
        const values = []
        for (let index = 0; index < arraySize; index++) {
            if (!this.buckets[index]) {
                continue;
            }
            const size = this.buckets[index].size();
            if (size === 1) {
                values.push(this.buckets[index].headNode().value.value);
                continue;
            } else {
                for (let listIndex = 0; listIndex < size; listIndex++) {
                    values.push(this.buckets[index].at(listIndex).value.value);
                }
            }
        }
        return values;
    }

    entries() {
        const keys = this.keys();
        const values = this.values();
        const length = keys.length;
        const entries = [];
        for (let index = 0; index < length; index++){
            entries.push([keys[index],values[index]])
        }
        return entries;
    }
}

// const hash = new Hashmap();
// hash.set("grape", 'red')
// hash.set("hat", 'blue')
// console.log(hash.buckets[11].headNode())
// hash.remove("hat")
// console.log(hash.buckets[11].headNode())
// console.log(hash.length())
// console.log(hash.keys())
// console.log(hash.values())
// console.log(hash.entries())

const test = new HashMap() 
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
console.log(test.keys())
console.log(test.values())
console.log(test.remove("kite"))
console.log(test.entries())
console.log(test.get("kite"))
