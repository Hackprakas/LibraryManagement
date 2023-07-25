import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useState } from 'react';
import { firebasecon } from './firebase/firebaseConfig';

export default function addbooks() {
 
  firebase.initializeApp(firebasecon);
  const [copies, setCopies] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const [bookName, setBookName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      copies,
      year,
      publisher,
      author,
      name,
      bookName
    };
    const dbRef = firebase.database().ref('books');
    dbRef.push(bookData)
      .then(() => {
        // console.log('Book data added to Firebase');
        setCopies('');
        setYear('');
        setPublisher('');
        setAuthor('');
        setName('');
        setBookName('');
        alert("Book added successfully");
      })
      .catch((error) => {
        console.error('Error adding book data to Firebase:', error);
      });
  };
  return (
    <div class="container mx-auto p-4">
  <div class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
    <h2 class="text-gray-900 text-lg title-font font-medium mb-4">Add Books</h2>
    <form onSubmit={handleSubmit}>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="bookName">Book Name</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bookName" type="text" value={bookName} placeholder="Enter book name" onChange={(e) => setBookName(e.target.value)}/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="authorName">Author Name</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="authorName" type="text" value={ author} placeholder="Enter author name" onChange={(e) => setAuthor(e.target.value)}/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="publisher">Publisher</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="publisher" type="text" value={publisher} placeholder="Enter publisher" onChange={(e) =>  setPublisher(e.target.value)}/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="year">Year</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="year" type="number" value={year} placeholder="Enter year" onChange={(e) => setYear(e.target.value)}/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="numCopies">Number of Copies</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numCopies" type="number" value ={copies} placeholder="Enter number of copies" onChange={(e) => setCopies(e.target.value)}/>
      </div>
      <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
    </form>
  </div>
</div>

  )
}
