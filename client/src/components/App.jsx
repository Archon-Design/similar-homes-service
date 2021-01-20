import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Similar from './Similar.jsx';
import Near from './Near.jsx';

const PageLayout = styled.div`
  color: rgb(59, 65, 68);
  max-width: 960px;
  margin: auto;
  padding: 16px env(safe-area-inset-right) 48px env(safe-area-inset-left);
`;

const API_URL = 'http://localhost:3000/api/homes';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      similarCarousel: [],
      nearCarousel: [],
    };
  }

  componentDidMount() {
    this.getHomes();
  }

  getHomes() {
    this.getNearbyHomes();
    this.getSimilarHomes();
  }

  getNearbyHomes() {
    const app = this;
    axios.get(`${API_URL}/nearby`)
      .then((results) => {
        app.setState({
          nearCarousel: results.data,
        });
      })
      .catch((err) => { console.log(err); });
  }

  getSimilarHomes() {
    const app = this;
    axios.get(`${API_URL}/similar`)
      .then((results) => {
        app.setState({
          similarCarousel: results.data,
        });
      })
      .catch((err) => { console.log(err); });
  }

  render() {
    //Why does my app not work if this isnt here...
    if (this.state.similarCarousel.length === 0) {
      return (<div>Loading</div>);
    }
    return (
      <PageLayout>
        <Similar homes={this.state.similarCarousel} />
        <Near homes={this.state.nearCarousel}/>
      </PageLayout>
    );
  }
}

export default App;
