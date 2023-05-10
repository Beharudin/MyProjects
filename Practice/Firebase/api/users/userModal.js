import db from "../../config/db.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

const userRef = collection(db, "users");

export function Get(callback) {
  const results = [];
  getDocs(userRef)
    .then((snapshoot) => {
      snapshoot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
  return callback(null, results);
    })
    .catch((error) => {
      return callback(error);
    });
  
}

export function Create(data, callback) {
addDoc(userRef, {name: data.name, email: data.email, phone: data.phone})
.then(()=>{
  return callback(null, {message: "User added successfully"});
}).catch((error)=>{
  return callback(error);
})
}

export function GetById(id, callback) {
  const docRef = doc(db, "users", id);
  getDoc(docRef)
  .then((results)=>{
    return callback(null, {...results.data(), id: results.id});
  }).catch((error)=>{
    return callback(error);
  })
}

export function Update(data, id, callback) {
  const docRef = doc(db, "users", id);
  updateDoc(docRef, {name: data.name, email: data.email, phone: data.phone})
  .then(()=>{
    return callback(null, {message: "User updated successfully"});
  }).catch((error)=>{
    return callback(error);
  })
}

export function Delete(id, callback) {
  const docRef = doc(db, "users", id);
  deleteDoc(docRef)
  .then(()=>{
    return callback(null, {message: "User deleted successfully"});
  }).catch((error)=>{
    return callback(error);
  })
}
