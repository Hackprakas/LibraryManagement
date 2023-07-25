import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { firebasecon } from './firebase/firebaseConfig';
import { useState } from 'react';

export default function allissue({isAdmin}) {
  firebase.initializeApp(firebasecon);
  const [books, setBooks] = useState([]);

     const handleclear = (bookId) => {
    // Handle clear action for the specific book with the given id
    const database = getDatabase();
      remove(ref(database, `issuedbooks/${bookId}`));
  };
  useEffect(() => {
    // Get a reference to the Firebase Realtime Database
    const database = getDatabase();
    const bookRef= ref(database, 'issuedbooks');
    onValue(bookRef, (snapshot) => {
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
  }, []);


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 text-left">Book</th>
            <th className="py-2 px-4 bg-gray-100 text-left">Author</th>
            <th className="py-2 px-4 bg-gray-100 text-left">Name</th>
            <th className="py-2 px-4 bg-gray-100 text-left">Issue Date</th>
            <th className="py-2 px-4 bg-gray-100 text-left">Return Date</th>
            <th className="py-2 px-4 bg-gray-100 text-left">Dues</th>
           {!isAdmin&& ( <th className="py-2 px-4 bg-gray-100 text-left">Action</th>)}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
          <tr key={book.id}>
            <td className="py-2 px-4">{book.bookname}</td>
            <td className="py-2 px-4">{book.author}</td>
            <td className="py-2 px-4">{book.studentname}</td>
            <td className="py-2 px-4">{book.issuedates}</td>
            <td className="py-2 px-4">{book.duedates}</td>
            <td className="py-2 px-4">{book.dues}</td>
            {!isAdmin && (<td className="py-2 px-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() =>handleclear (book.id)}>Return Book</button>
            </td>)}
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

