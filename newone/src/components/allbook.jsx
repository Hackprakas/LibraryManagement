import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getDatabase, ref, onValue, remove, set } from 'firebase/database';
import { firebasecon } from './firebase/firebaseConfig';
import { getAuth } from "firebase/auth";

export default function allbook({ isAdmin }) {
  firebase.initializeApp(firebasecon);
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(futureDate.getDate() + 15);


  // const [buttonText, setButtonText] = useState('retrieve');

  useEffect(() => {
    // Get a reference to the Firebase Realtime Database
    const database = getDatabase();

    // Set up a listener to fetch the book data from the database
    const booksRef = ref(database, 'books');
    const stuRef = ref(database, 'students');
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
    onValue(stuRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object of books into an array
        const stuarray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setStudents(stuarray);
      } else {
        setStudents([]);
      }
    });

    // Clean up the listener when component unmounts
    // return () => {
    //   if(onValue){
    //   onValue(booksRef,null);}
    // };
  }, []);

  const handleDeleteBook = (bookId) => {
    // Get a reference to the Firebase Realtime Database
    const database = getDatabase();

    // Delete the book from the database using its ID
    remove(ref(database, `books/${bookId}`))
      .then(() => {
        // Book deleted successfully
        console.log('Book deleted from Firebase Realtime Database');
      })
      .catch((error) => {
        // Error occurred while deleting the book
        console.error('Error deleting book from Firebase Realtime Database:', error);
      });
  };
  const handleRetrieve = (book) => {
    const dbRef = firebase.database().ref('issuerequest');
    //write code such that it will add the book name,author,copies,status from the table to the database
    const auth = getAuth();
    const user = auth.currentUser;
    const bookId = {
      bookName: book.bookName,
      Author: book.author,
      copies: book.copies,
      status: book.copies == 0 ? 'Not Available' : 'Available',
      userEmail: user.email,
      userName: user.displayName,
      issuedate: currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear(),
      returndate: futureDate.getDate() + "-" + (futureDate.getMonth() + 1) + "-" + futureDate.getFullYear(),
    };
    let isStudent = false;

    for (const student of students) {
      if (student.emailid === user.email) {
        isStudent = true;
        break;
      }
    }
    if (!isStudent) {
      alert("You are not a student");
      return;
    } else {
      dbRef.push(bookId);
      alert("Book Requested");
    }

    // book.setButtonText('Requested');
  };
  return (
    <div className="flex h-96 justify-center mb-8">
      <div className='w-16 flex  flex-col justify-center items-center'>
        <table className="min-w-full  border-gray-300">
          <thead className='rounded-lg'>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Serial No</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Title</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Author</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Copies</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Status</th>
              <th className="py-2 px-4 border-b bg-gray-100 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td className="py-2 bg-white px-4 border-b">{index + 1}</td>
                <td className="py-2 bg-white px-4 border-b">{book.bookName}</td>
                <td className="py-2 bg-white px-4 border-b">{book.author}</td>
                <td className="py-2 bg-white px-4 border-b">{book.copies}</td>
                <td className="py-2 bg-white px-4 border-b">{book.copies == 0 ? 'Not Available' : 'Available'}</td>
                {isAdmin ? (<td className="py-2 bg-white px-4 border-b">
                  <svg className="w-6 h-6 fill-current text-gray-500 cursor-pointer hover:text-red-500 transition-opacity" viewBox="0 0 24 24" onClick={() => handleDeleteBook(book.id)} style={{ opacity: 1 }}>
                    <path d="M19 7h-4l-1-1m-1-1h-2m-6 0H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1 10H6m6 0h5m-5 3h4v-4h-4v4z"></path>
                  </svg>
                </td>) : (<td className="py-2 bg-white px-4 border-b">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRetrieve(book)}>retrieve </button>
                </td>)}
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
