import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import React from 'react';
import Login from './components/Login'
import Header from './components/Header'
import AddStudent from './components/AddStudent'
import AddSubject from './components/AddSubject';
class App extends React.Component{
	constructor(props){
		super(props);
		this.isLoggedIn = false;
		this.state = {
			isLoggedIn:false
		}
		this.logoutTimer = setTimeout(function () { sessionStorage.clear(); }, (10 * 60 * 1000));
		this.setLoggedIn = this.setLoggedIn.bind(this);
	}


	setLoggedIn(isLoggedIn){
		sessionStorage.setItem('isLoggedIn', isLoggedIn)
		this.setState({
			isLoggedIn: JSON.parse(sessionStorage.getItem('isLoggedIn'))
		});
	}

  	componentDidMount(){
		this.setState({
			isLoggedIn:JSON.parse(sessionStorage.getItem('isLoggedIn'))
		});
	}


  	render() {
    	if(!this.state.isLoggedIn){
      		return (
        		<Login setLoggedIn = {this.setLoggedIn}/>
      		)
    	}else{
      		return (
		  		<Router>
			  		<Header />
			  		<Switch>
						<Route exact path="/" />
						<Route path="/add/student" component={AddStudent} />
						<Route path="/add/subject" component={AddSubject}/>
					</Switch>
				</Router>
      			)
    	}
  	}
}

export default App;