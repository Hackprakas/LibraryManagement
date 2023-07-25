import React, { useEffect } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getDatabase, ref, onValue, remove, set } from 'firebase/database';
import { firebasecon } from './firebase/firebaseConfig';
import { useState } from 'react';



export default function managestu() {
    firebase.initializeApp(firebasecon);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        // Get a reference to the Firebase Realtime Database
        const database = getDatabase();
        const stuRef = ref(database, 'students');
        onValue(stuRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the object of books into an array
                const stuarray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setBooks(stuarray);
            } else {
                setBooks([]);
            }
        });
    }, []);

  return (
    <div className="flex h-96 justify-center mb-8">
      <div className='w-16 flex  flex-col justify-center items-center'>
        <table className="min-w-full  border-gray-300">
          <thead className='rounded-lg'>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Serial No</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Student Name</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Roll No</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Email</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Studying year</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td className="py-2 bg-white px-4 border-b">{index + 1}</td>
                <td className="py-2 bg-white px-4 border-b">{book.name}</td>
                <td className="py-2 bg-white px-4 border-b">{book.rollno}</td>
                <td className="py-2 bg-white px-4 border-b">{book.emailid}</td>
                <td className="py-2 bg-white px-4 border-b">{book.year}</td>
                
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
