import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useState } from 'react';
import { firebasecon } from './firebase/firebaseConfig';

export default function addstu() {
    firebase.initializeApp(firebasecon);
    const [year, setYear] = useState('');
    const [rollno, setrollno] = useState('');
    const [emailid, setemail] = useState('');
    const [name, setName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const bookData = {
        name,
        year,
        rollno,
        emailid,
        
      };
      const dbRef = firebase.database().ref('students');
      dbRef.push(bookData)
        .then(() => {
          // console.log('Book data added to Firebase');
          setYear('');
          setrollno('');
          setemail('');
          setName('');
          alert("Book added successfully");
        })
        .catch((error) => {
          console.error('Error adding book data to Firebase:', error);
        });
    };
  return (
    <div class="container mx-auto p-4">
    <div class="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
      <h2 class="text-gray-900 text-lg title-font font-medium mb-4">Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="bookName">Student Name</label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bookName" type="text" value={name} placeholder="Enter book name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="authorName">Roll Name</label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="authorName" type="text" value={ rollno} placeholder="Enter author name" onChange={(e) => setrollno(e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="publisher">Email Id</label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="publisher" type="text" value={emailid} placeholder="Enter publisher" onChange={(e) =>  setemail(e.target.value)}/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="year">Studying Year</label>
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="year" type="number" value={year} placeholder="Enter year" onChange={(e) => setYear(e.target.value)}/>
        </div>
       
        <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
      </form>
    </div>
  </div>
  
  )
}
