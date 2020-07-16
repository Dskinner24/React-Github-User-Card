import React from "react";
import axios from "axios";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Button
} from "reactstrap";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      userText: "",
      error: "",
      followers: []
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/dskinner24")
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      // res.data
      .catch(err => console.log(err));

    axios
      .get("https://api.github.com/users/dskinner24/followers")
      .then(res => {
        this.setState({
          followers: res.data
        });
        // console.log(this.state.followers);
      })
      .catch(err => console.log(err));
  }

  handleChanges = e => {
    this.setState({
      userText: e.target.value
    });
  };

  fetchUser = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userText}`)
      .then(res => {
        this.setState({
          user: res.data,
          error: ""
        });
      })

      .catch(err => {
        this.setState({
          user: [],
          error: "Invalid Username"
        });
      });
  };

  render() {
    return (
      <div style={{ background: 'darkgrey'}}className="App">
        <Card style={{ margin: '3%', color: '#696969', background: 'black', width: '35%', marginLeft: '32%', borderRadius: '10px'}}>
          <CardTitle style={{margin: '3%', fontSize: '25px', color: 'whitesmoke'}}>GitHub User Finder</CardTitle>
          <input
            style={{width: '60%', borderRadius: '5px'}}
            type="text"
            placeholder="Github username"
            value={this.userText}
            onChange={this.handleChanges}
          />
          <Button style={{width: '40%', margin: '3%', borderRadius: '5px'}} onClick={this.fetchUser}>Search</Button>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
        </Card>
        <div className="profiles">
          {!this.state.error && (
            <>
              <CardBody>
                <CardTitle style={{ fontSize: '25px', margin: '3%', fontWeight: 'bold'}}>{this.state.user.login}</CardTitle>
                <CardImg style={{ borderRadius: '250px'}} src={this.state.user.avatar_url} alt="Profile" />
                <CardText style={{ fontSize: '20px', fontWeight: 'bold'}}> {this.state.user.name} </CardText>
                <CardText >Bio: {this.state.user.bio} </CardText>
                <CardText>
                  Twitter Handle: {this.state.user.twitter_username}
                </CardText>
                <CardText>Followers: {this.state.user.followers}</CardText>
                {this.state.followers.map((follower) => (
                  <a href={`https://api.github.com/users/${follower.login}`} key={follower.id}>{follower.login}<br /></a>
                ))}
                <CardText>Following: {this.state.user.following}</CardText>
              </CardBody>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
