var Link = require("react-router").Link;
let Results = require("./Results");

import request from 'axios';
import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
		this.onSearch = this.onSearch.bind(this);
	}


	onSearch(e) {
		e.preventDefault();

		const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

   	console.log("FORMDATA", formData);
	  setTimeout(function(){
	   		request.get('/saved', {
	   		params: formData
	   	}).then(function(response){
	   		console.log("request response", response)
	   	})
   	}, 1000)
   	

		//submit a query to server

	}

	render() {
		return (
			<div className="row">
				<div className="col-lg-12">
					<div className="panel panel-warning">
						<div className="panel-heading">
							<h3 classNames="panel-title">Search</h3>
						</div>
						<div className="panel-body center">

							{/*start bootstrap form*/}

							<form onSubmit={this.onSearch}>
							<div className="form-group">
								<label>Topic</label>
								<input ref="topic" type="text" className="form-control" id="Inputtext" placeholder="Topic" />
							</div>
							<div className="form-group">
								<label>Start Year</label>
								<input ref="Start" type="text" className="form-control" id="Inputtext2" placeholder="Start Year" />
							</div>
							<div className="form-group">
								<label>End Year</label>
								<input ref="End" type="text" className="form-control" id="Inputtext3" placeholder="End Year" />
							</div>
							
							<button type="submit" className="btn btn-warning">Submit</button>
							</form>
							{/*end bootstrap form*/}
							
						</div>
					</div>
					<Results />
				</div>
				
			</div>
		);

	}

}



// var Search = React.createClass({
// 	render: function () {
// 		return (
// 			<div className="row">
// 				<div className="col-lg-12">
// 					<div className="panel panel-warning">
// 						<div className="panel-heading">
// 							<h3 classNames="panel-title">Search</h3>
// 						</div>
// 						<div className="panel-body center">

// 							{/*start bootstrap form*/}

// 							<form>
// 							<div className="form-group">
// 								<label>Topic</label>
// 								<input type="text" className="form-control" id="Inputtext" placeholder="Topic" />
// 							</div>
// 							<div className="form-group">
// 								<label>Start Year</label>
// 								<input type="text" className="form-control" id="Inputtext2" placeholder="Start Year" />
// 							</div>
// 							<div className="form-group">
// 								<label>End Year</label>
// 								<input type="text" className="form-control" id="Inputtext3" placeholder="End Year" />
// 							</div>
							
// 							<button type="submit" className="btn btn-warning">Submit</button>
// 							</form>
// 							{/*end bootstrap form*/}
							
// 						</div>
// 					</div>
// 					<Resutls />
// 				</div>
				
// 			</div>
// 		);
// 	}
// });

module.exports = Search;
