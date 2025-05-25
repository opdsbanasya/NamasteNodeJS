## epoll vs kqueue
## **epoll (Linux)**

### How it works:

1. Tum `epoll_create()` se ek epoll object banate ho.
2. Fir tum `epoll_ctl()` se usme file descriptors (jaise sockets) add karte ho.
3. Fir `epoll_wait()` use karke check karte ho ki kaunsa fd ready hai read/write ke liye.

### Under the hood – Data Structure:

- `epoll` internally uses:

  - **Red-black tree (RB-Tree)**:
    ➤ Har baar jab tum `epoll_ctl()` se koi FD add ya remove karte ho, woh RB-tree me insert/remove hota hai.
    ➤ Efficient searching and balancing — O(log n)

  - **Ready list (Linked List)**:
    ➤ Jab koi FD ready ho jata hai (jaise data aata hai), usse ek ready queue me daal diya jata hai (linked list format)
    ➤ `epoll_wait()` sirf is ready list ko scan karta hai — O(1)

**Summary**:

- RB-tree → FD manage karne ke liye
- Linked list → Ready FDs track karne ke liye
- Is combination ki wajah se epoll high-performance hai, even with 1000s of connections

---

## 🔁 **kqueue (BSD/macOS)**

### 💡 How it works:

1. `kqueue()` se ek event queue banti hai.
2. `kevent()` se tum events register karte ho (like read/write, signals, file change, timers, etc.)
3. Fir `kevent()` ko call karke wait karte ho ki koi event hua ya nahi.

⚠️ Difference from epoll:
`kqueue` is more **general-purpose** — sirf I/O hi nahi, balki signals, file changes, process events, timers bhi handle karta hai.

### Under the hood – Data Structure:

`kqueue` uses:

  - **Hash table** (for event registration):
    Jab tum `kevent()` call karte ho to har FD/event ke liye ek key-value store ban jata hai.

  - **List of triggered events (dynamic array ya list)**:
    Jab koi event hota hai, woh ek "pending event list" me chala jata hai.
    `kevent()` call karne par ye list return hoti hai.

---

## 🔍 **epoll vs kqueue – Comparison**

| Feature        | epoll (Linux)                 | kqueue (BSD/macOS)                   |
| -------------- | ----------------------------- | ------------------------------------ |
| Platform       | Linux only                    | BSD, macOS, FreeBSD                  |
| Use            | Only I/O (mostly sockets)     | I/O + signals + files + timers       |
| Data Structure | RB-tree + Linked list         | Hash table + List                    |
| Performance    | O(1) on wait, O(log n) on ctl | O(1) (but depends on implementation) |
| Event Types    | Limited                       | Very flexible                        |

Agar tum server ya high-performance application bana rahe ho (jaise chat app, load balancer), to `epoll` ya `kqueue` dono hi kaafi powerful hain — bas platform ke hisaab se select karte hain.

---

## **File Descriptor (FD)**

### Definition:

> FD ek integer number hota hai jo OS kisi bhi open file, socket, pipe, ya stream ko represent karne ke liye use karta hai.

### Simple words:

- Jab tum file open karte ho, to OS use ek number (FD) assign karta hai.
- Tum us number ko use karke file read/write karte ho.

### Example:

```js
fs.open('file.txt', 'r', (err, fd) => {
  console.log(fd); // e.g., 3
});
```

### Default FD:

- `0` – stdin (input)
- `1` – stdout (output)
- `2` – stderr (error)

---

## **Event Emitters & Listeners**

### Definition:

> EventEmitter ek class hoti hai Node.js mein jisme hum events create aur handle karte hain using `.emit()` (to fire event) aur `.on()` (to listen to event).

### Simple words:

- Tum ek event "emit" karte ho — matlab kuch hua.
- Listener us event ko "sun" kar response deta hai.

### Example:

```js
const EventEmitter = require('events');
const event = new EventEmitter();

event.on('sayHi', () => {
  console.log('Hello there!');
});

event.emit('sayHi'); // triggers the event
```

---

## **Streams & Buffers**

### Definition:

> Streams allow you to read or write data **in chunks** (parts), especially useful for large data.
> Buffer ek temporary memory area hai jo data ko hold karta hai jab tak woh process nahi ho jata.

### Simple words:

- **Buffer** → short-term memory jahan data store hota hai (like loading bar).
- **Stream** → water ki tarah flow karte hue data, jise tum thoda thoda process karte ho.

### Example (Read Stream):

```js
const fs = require('fs');
const stream = fs.createReadStream('bigfile.txt');

stream.on('data', chunk => {
  console.log('New chunk:', chunk);
});
```

Real-life Example:
- Netflix video stream karta hai — pura ek sath nahi aata, thoda thoda load hota hai.

---

## **Pipes**

### Definition:

> Pipe ek method hai jisse tum ek stream ko directly dusre stream se connect kar sakte ho.

### Simple words:

- Tum `readStream` ka data directly `writeStream` ko de sakte ho bina manually data handle kiye.

### Example:

```js
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream); // input.txt → output.txt
```

Iska fayda ye hota hai ki data efficiently transfer hota hai, bina memory overload ke.

---

Bahut badhiya! Tum ab Node.js ke kaafi advanced topics touch kar rahe ho. Chalo in dono ko **simple Hinlish** mein breakdown karte hain:

---

## `process.nextTick()` vs `setImmediate()`

### 🔥 Both are used to schedule callbacks in the **event loop**, but unka **timing & priority** different hota hai.

---

### 1. 🌀 `process.nextTick()`

#### 📖 Definition:

Ye function tumhara callback **current operation ke complete hone ke turant baad**, **before any I/O events or timers**, run karta hai.

#### 🧠 Simple Words:

* Sabse pehle run hota hai.
* Even timers, I/O se pehle bhi.

#### ✅ Example:

```js
console.log('Start');

process.nextTick(() => {
  console.log('Inside nextTick');
});

console.log('End');
```

#### 🧾 Output:

```
Start
End
Inside nextTick
```

🧠 Socho isse jaise: **"Pahele yeh kar leta hoon, baaki sab baad mein dekh lenge."**

---

### 2. ⏳ `setImmediate()`

#### 📖 Definition:

Ye callback ko **current event loop ke complete hone ke baad**, **next phase mein** schedule karta hai.

#### 🧠 Simple Words:

* `setTimeout(fn, 0)` jaisa, but more accurate.
* After I/O phase mein execute hota hai.

#### ✅ Example:

```js
console.log('Start');

setImmediate(() => {
  console.log('Inside setImmediate');
});

console.log('End');
```

#### 🧾 Output:

```
Start
End
Inside setImmediate
```

---

### 💥 Key Difference Summary:

| Feature  | `process.nextTick()`   | `setImmediate()`           |
| -------- | ---------------------- | -------------------------- |
| Priority | High (Before I/O)      | Lower (After I/O)          |
| Runs in  | Same Phase (microtask) | Next Phase (check phase)   |
| Use when | Urgent internal logic  | Delayed non-blocking logic |

---

## ⏰ Timer & Min Heap Data Structure

### 🔍 What are Timers?

Node.js mein jab tum `setTimeout()` ya `setInterval()` use karte ho, to Node internally ek **Timer Scheduler** use karta hai — jisme **Min Heap** data structure ka use hota hai.

---

### 🧠 Why Min Heap?

#### 🔢 Min Heap:

> A binary tree where the smallest value (soonest timer) is always at the top/root.

### 💡 Simple words:

* Suppose 3 timers: `setTimeout(a, 3000)`, `setTimeout(b, 1000)`, `setTimeout(c, 2000)`
* Min Heap helps Node.js ko **sabse pehle chalne waala timer** (b) ko detect karne mein **fast** banata hai.

### ✅ Benefits:

* Fast retrieval of smallest timeout.
* Efficient rescheduling when many timers are pending.

---

### 🔁 Timer Flow in Event Loop (Simplified):

1. Timer added → goes to **min heap**.
2. Event loop checks: is it time to run?
3. If yes, callback run karo and remove from heap.

---

### 📌 Diagram Idea:

```
              [1000ms]
              /     \
         [3000ms]  [2000ms]
```

> Top = smallest = **run first**

---

## 🔚 TL;DR

| Concept              | In Short                                   |
| -------------------- | ------------------------------------------ |
| `process.nextTick()` | Runs **before I/O**, very urgent microtask |
| `setImmediate()`     | Runs **after I/O**, less urgent            |
| Min Heap in Timers   | Helps **pick earliest timer** quickly      |

---

## 🤔 Kya `process.nextTick` aur `setImmediate` ke naam galti se swap ho gaye?

**Lagta hai, haan!** But **technically nahi** — lekin **intuitively, haan** lag sakta hai. Naam aise lagte hain jaise:

* `process.nextTick()` → should run **after current event loop tick**
* `setImmediate()` → should run **immediately**

👉 **But reality mein:**

| Method               | Actual Timing                                                   |
| -------------------- | --------------------------------------------------------------- |
| `process.nextTick()` | Runs **before the next event loop tick** — i.e., before any I/O |
| `setImmediate()`     | Runs **on the next event loop tick**, in the `check` phase      |

---

### 🎯 Why the confusion?

Because:

* `nextTick()` sounds like **"next loop iteration"**, but it runs **before** that!
* `setImmediate()` sounds like **"run instantly"**, but it waits till the **next iteration**!

---

### 🧠 Mnemonic yaad rakhne ke liye:

> **"nextTick is actually now-now. setImmediate is soon-soon."**
> Matlab: `nextTick` = abhi karna hai. `setImmediate` = thoda ruk ke.
