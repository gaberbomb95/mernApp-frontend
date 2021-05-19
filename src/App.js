import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  // URL in a variable
  const url = "https://mern-app-gr.herokuapp.com";

  
  const [guns, setGuns] = React.useState([]);

  const emptyGun = {
    brand: "",
    model: "",
    img: ""
  };

  const [selectedGun, setSelectedGun] = React.useState(emptyGun);

  
  const getGun = () => {
    // make a get a request to this url
    fetch(url + "/guns/")
      // use .then to take action when the response comes in
      // convert data into js object
      .then((response) => response.json())
      // use the data from the response
      .then((data) => {
        setGuns(data);
      });
  };

  // useEffect, to get the data right away
  React.useEffect(() => {
    getGun();
  }, []);

  //handleCreate - function for when the create form is submitted
  const handleCreate = (newGun) => {
    console.log("newgun---", newGun)
    fetch(url + "/guns/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGun),
    }).then(getGun());
  };

  // handleUpdate - function for when the edit form is submitted
  const handleUpdate = (gun) => {
    fetch(url + "/guns/" + gun._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gun),
    }).then(() => getGun());
  };

 
  const selectGun = (gun) => {
    setSelectedGun(gun);
  };

 
  const deleteGun = (gun) => {
    fetch(url + "/gun/" + gun._id, {
      method: "delete"
    })
    .then(() => {
      getGun()
    })
  }

  return (
    <div className="App">
      <h1>My Guns</h1>
      <hr />
      <Link to="/create">
        <button>Add Gun</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              guns={guns} 
              selectGun={selectGun}
              deleteGun={deleteGun} 
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                gun={emptyGun}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              gun={selectedGun} 
              handleSubmit={handleCreate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;