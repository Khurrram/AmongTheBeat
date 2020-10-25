import React from 'react';
import Home from './Homepage/HomePage';
import MoodPage from './MoodPage/MoodPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

// function Home() {
//   return (
//     <h1>HOME PAGE</h1>
//   );
// }

// function test() {
//   return (
//     <h1>TEST</h1>
//   );
// }

// function Sidebar() {

//     return (
//         <div className="sidebar">
//             <img></img>
//             <ul>
//                 <li>
//                     Browse
//                 </li>
//                 <li>
//                     Search
//                 </li>
//             </ul>
//             <hr></hr>

//             <ul>
//               <li>lol</li>
//             </ul>
//         </div>
//     );
// }

function App() {
  return (
    
    <Router>
      
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path = '/mood' exact = {true} component = {MoodPage}/>

      </Switch>
    </Router>
  );
}

export default App;

