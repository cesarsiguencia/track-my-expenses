let db;

const request = indexedDB.open('track-my-expenses', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_expense', { autoIncrement: true });
};

request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    if (navigator.onLine) {
      uploadExpense();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(['new_expense'], 'readwrite');
  
    const getObjectStore = transaction.objectStore('new_expense');
  
    getObjectStore.add(record);
}

function uploadExpense() {
    const transaction = db.transaction(['new_expense'], 'readwrite');
  
    const getObjectStore = transaction.objectStore('new_expense');
  
    const getAll = getObjectStore.getAll();
  
    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
        fetch('/api/pizzas', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(serverResponse => {
            if (serverResponse.message) {
                throw new Error(serverResponse);
            }
            const transaction = db.transaction(['new_expense'], 'readwrite');
            const getObjectStore = transaction.objectStore('new_expense');
            getObjectStore.clear();

            alert('New expense added');
            })
            .catch(err => {
            console.log(err);
            });
        }
    };
}

window.addEventListener('online', uploadExpense)
