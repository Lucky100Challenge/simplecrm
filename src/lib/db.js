import { openDB } from 'idb';

const DB_NAME = 'crm_db';
const DB_VERSION = 2; // Increment this to trigger database upgrade

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const stores = ['contacts', 'leads', 'deals', 'companies', 'tasks', 'notes'];
      stores.forEach(store => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
        }
      });
    },
  });
}

async function getStore(storeName, mode = 'readonly') {
  const db = await initDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

export async function getAll(storeName) {
  const store = await getStore(storeName);
  return store.getAll();
}

export async function get(storeName, id) {
  const store = await getStore(storeName);
  return store.get(id);
}

export async function add(storeName, item) {
  const store = await getStore(storeName, 'readwrite');
  return store.add(item);
}

export async function update(storeName, item) {
  const store = await getStore(storeName, 'readwrite');
  return store.put(item);
}

export async function remove(storeName, id) {
  const store = await getStore(storeName, 'readwrite');
  return store.delete(id);
}

export async function addTask(task) {
  const store = await getStore('tasks', 'readwrite');
  return store.add({ ...task, createdAt: new Date().toISOString() });
}

export async function updateTask(task) {
  const store = await getStore('tasks', 'readwrite');
  return store.put(task);
}

export async function deleteTask(id) {
  const store = await getStore('tasks', 'readwrite');
  return store.delete(id);
}

export async function getAllTasks() {
  const store = await getStore('tasks');
  return store.getAll();
}

export async function addNote(note) {
  const store = await getStore('notes', 'readwrite');
  return store.add({ ...note, createdAt: new Date().toISOString() });
}

export async function updateNote(note) {
  const store = await getStore('notes', 'readwrite');
  return store.put(note);
}

export async function deleteNote(id) {
  const store = await getStore('notes', 'readwrite');
  return store.delete(id);
}

export async function getAllNotes() {
  const store = await getStore('notes');
  return store.getAll();
}