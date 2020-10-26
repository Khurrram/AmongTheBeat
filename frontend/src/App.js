import './App.css';
import LandingPage from './LandingPage/LandingPage';
import React from 'react';




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {current_page : "Landing_Page"}
  }
  render() {
  if(this.state.current_page) {
    return <LandingPage />;
  }
}
}


export default App;
