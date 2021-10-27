import './App.css';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import Student from "./Student";
import 'materialize-css/dist/css/materialize.min.css'

function App() {
    const [students, setStudents] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchTag, setSearchTag] = useState('')

    const url = 'https://api.hatchways.io/assessment/students';

    useEffect(() => {
        axios.get(url)
            .then(res => setStudents(res.data.students))
            .catch(err => console.log(err));
    }, [])

    const regExpName = new RegExp(`${searchName}`, "i")
    const regExpTag = new RegExp(`${searchTag}`, "i")

    const searchFilter = (el) => {
        if (searchName === '') return el
        else if (regExpName.test(el.firstName) || regExpName.test(el.lastName)) return el
    }
    const searchFilterTag = (el) => {
        if (searchTag === '') return el
        if (el.tag && regExpTag.test(el.tag)) return el
    }

    const addTag = (item, id) => {
        const newStudents = students.map(el => el.id === id ? {...el, tag: item} : el)
        setStudents(newStudents);
    }

    return (
        <div className="App">

            <header className="App-header">
                <h1>Students list</h1>
            </header>
            <form>
                <div className="input-group">
                    <div className="input-search">

                        <input type="text" name='search' placeholder="Search by name"
                               onChange={(e) => setSearchName(e.target.value)}/>
                    </div>
                    <div className="input-search">

                        <input type="text" name='search' placeholder="Search by tag"
                               onChange={(e) => setSearchTag(e.target.value)}/>
                    </div>
                </div>

            </form>
            {students
                .filter(searchFilter)
                .filter(searchFilterTag)
                .map(el => <div key={el.id}>
                    <Student student={el}
                             regExpName={regExpName}
                             regExpTag={regExpTag}
                             addTag={addTag}
                    />
                </div>)
            }
        </div>
    );
}

export default App;