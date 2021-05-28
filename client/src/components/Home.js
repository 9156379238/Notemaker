import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import '../Home.css';
import axios from 'axios';

const Home = () => {
    const [notes, setNotes] = useState([
        // {
        //     text: 'This is my first note!
        //     date: '28/05/2021',
        // }
        // {
        //     id: nanoid(),
        //     text: 'This is my second note!',
        //     date: '28/05/2021',
        // },
    ]);


    useEffect(() => {
        display();
    }, []);
    const display = async () => {
        const result = await axios.get("http://localhost:5000/Note/Note");
        setNotes(result.data);
    };


    const [searchText, setSearchText] = useState('');

    const [darkMode, setDarkMode] = useState(false);

    // useEffect(() => {
    // 	const savedNotes = JSON.parse(
    // 		localStorage.getItem('react-notes-app-data')
    // 	);

    // 	if (savedNotes) {
    // 		setNotes(savedNotes);
    // 	}
    // }, []);

    // // useEffect(() => {
    // // 	localStorage.setItem(
    // // 		'react-notes-app-data',
    // // 		JSON.stringify(notes)
    // // 	);
    // // }, [notes]);


    const addNote = (text) => {

        const date = new Date();
        const newNote = {

            id: nanoid(),
            text: text,
            date: date.toLocaleDateString(),
        };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);

    };

    const editnote = (id)=>{
console.log(id);
    }

    const deleteNote = (id) => {
        axios.delete(`http://localhost:5000/Note/Note/${id}`).then((res) => {
            setNotes(notes.filter((val) => {
                return val.id != id;
            })
            );
             // const newNotes = notes.filter((note) => note.text !== text);
    // setNotes(newNotes);
        });
    };


   
    return (
        <>
            <Navbar />
            <div className={`${darkMode && 'dark-mode'}`}>
                <div className='container'>
                    <Header handleToggleDarkMode={setDarkMode} />
                    <Search handleSearchNote={setSearchText} />
                    <NotesList
                        notes={notes.filter((note) =>
                            note.text.toLowerCase().includes(searchText)

                        )}
                        handleAddNote={addNote}
                        handleDeleteNote={deleteNote}
                        handleeditnote={editnote}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
