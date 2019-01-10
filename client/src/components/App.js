import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  // initialize our state 
  state = {
    data: [],
    message: null
    // intervalIsSet: false,
    // objectToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has 
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  // never let a process live forever 
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    // if (this.state.intervalIsSet) {
    //   clearInterval(this.state.intervalIsSet);
    //   this.setState({ intervalIsSet: null });
    // }
  }

  // just a note, here, in the front end, we use the id key of our data object 
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify 
  // data base entries

  // our first get method that uses our backend api to 
  // fetch data from our data base
  getDataFromDb = () => {
    axios.get("/api/getData")
      .then(res => {
        const data = res.data.data
        this.setState({ data: data })});
  };


  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    // let objIdToDelete = null;
    // this.state.data.forEach(dat => {
    //   if (dat.id == idTodelete) {
    //     objIdToDelete = dat._id;
    // //   }
    // });

    axios.delete(`/api/deleteData/${idTodelete}`)
    .then((res) => {
      const index = this.state.data.findIndex(post => post._id === idTodelete)
      if (index >= 0) {
        const newData = [...this.state.data]
        newData.splice(index,1)
        console.log('deleted bookmark from state',newData)
        this.setState(newData)
      }
      console.log('result from delete',res)
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };


  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen
  render() {
    const { data } = this.state;
    // console.log(this.state)
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={dat._id}>
                  <span style={{ color: "gray" }}> id: </span> {dat._id} <br />
                  <span style={{ color: "gray" }}> data: </span>
                  {dat.message}
                  <br></br>
                  <button onClick={() => this.deleteFromDB(dat._id)}>
                    DELETE
                  </button>
                </li>
              ))}
        </ul>


        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;
