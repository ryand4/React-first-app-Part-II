//import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';
import React, {useState, useEffect} from 'react';

function MyApp() {
	useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  const [characters, setCharacters] = useState([]);  
  //<Form handleSubmit={updateList} />

	function removeOneCharacter (index) {
	    const updated = characters.filter((character, i) => {
	        return i !== index
	    });
	  setCharacters(updated);
	}

  function updateList(person) { 
    postUser(person)
      .then( (res) => {
        if (res.status === 201){
          setCharacters([...characters, person]);
          }
      })
      .catch( (error) => console.log(error) );
    }
  //function submitForm() {
  //  props.handleSubmit(person);
  //  setPerson({name: '', job: ''});
  //}
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (

    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList} />
      
    </div>
  )
}

export default MyApp;