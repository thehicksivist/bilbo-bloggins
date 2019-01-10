// here will be a route for creating a new entry
import React, {Component} from 'react'
import axios from 'axios'


class Create extends Component {

    state = {
        data: [],
        message: null,
        intervalIsSet: false,
        objectToUpdate: null
      };
    
      // when component mounts, first thing it does is fetch all existing data in our db
      // then we incorporate a polling logic so that we can easily see if our db has 
      // changed and implement those changes into our UI
      componentDidMount() {
        // this.getDataFromDb();
        // if (!this.state.intervalIsSet) {
        //   let interval = setInterval(this.getDataFromDb, 1000);
        //   this.setState({ intervalIsSet: interval });
        // }
      }
    
      // never let a process live forever 
      // always kill a process everytime we are done using it
      componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
      }

    putDataToDB = message => {

        alert(this.state.data + 'Your post has been added!');
        // wipe component entry field
        
    
        axios.post("/api/putData", {
          message: message
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.error('caught on axios post', err)
        });
        
      };

    render() {
      return (
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
      );
    }
  }
  
  export default Create;