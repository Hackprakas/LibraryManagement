
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { firebasecon } from './firebase/firebaseConfig';
import { getAuth } from "firebase/auth";

export default function issuerequest() {
  firebase.initializeApp(firebasecon);
  const [books, setBooks] = useState([]);
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(futureDate.getDate() + 15);

  // const [buttonText, setButtonText] = useState('retrieve');

  useEffect(() => {
    // Get a reference to the Firebase Realtime Database
    const database = getDatabase();

    // Set up a listener to fetch the book data from the database
    const booksRef = ref(database, 'issuerequest');
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object of books into an array
        const bookArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setBooks(bookArray);
      } else {  
        setBooks([]);

    }

    });

    // Clean up the listener when component unmounts
    // return () => {
    //   if (onValue) {
    //     onValue(booksRef, null);
    //   }
    // };
  }, []);
  
    const handleAccept = (book,bookId) => {
      // Handle accept action for the specific book with the given id
      const bookData = {
        issuedates:book.issuedate,
        duedates:book.returndate,
        dues:currentDate > futureDate ? 150 : 0,
        author:book.Author,
        studentname:book.userName,
        bookname:book.bookName,
      };
      const dbRef = firebase.database().ref('issuedbooks');
      dbRef.push(bookData);
      alert("Book accepted");
      const database = getDatabase();
      remove(ref(database, `issuerequest/${bookId}`));
      
      
    };

    const handleReject = (bookId) => {
      // Handle reject action for the specific book with the given id
      const database = getDatabase();
      remove(ref(database, `issuerequest/${bookId}`));
      alert("Book rejected ");
      
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left">Book Name</th>
              <th className="py-2 px-4 bg-gray-100 text-left">Author</th>
              <th className="py-2 px-4 bg-gray-100 text-left">UserName</th>
              <th className="py-2 px-4 bg-gray-100 text-left">UserEmail</th>
              <th className="py-2 px-4 bg-gray-100 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book,index) => (
            <tr key={book.id}>
            <td className="py-2 px-4">{book.bookName}</td>
            <td className="py-2 px-4">{book.Author}</td>
            <td className="py-2 px-4">{book.userName}</td>
            <td className="py-2 px-4">{book.userEmail}</td>
            <td className="py-2 px-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleAccept(book,book.id)}>Accepted</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleReject(1)}>Rejected</button>
            </td>
            </tr>
              ))} 
          </tbody>
      </table>
      </div>
    );
  
}


