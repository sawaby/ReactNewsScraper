var React = require("react");
var Link = require("react-router").Link;
let Resutls = require("./Results");

var Search = React.createClass({
	render: function () {
		return (
			<div className="row">
				<div className="col-lg-12">
					<div className="panel panel-warning">
						<div className="panel-heading">
							<h3 classNames="panel-title">Search</h3>
						</div>
						<div className="panel-body center">

							{/*start bootstrap form*/}

							<form>
							<div className="form-group">
								<label>Topic</label>
								<input type="text" className="form-control" id="Inputtext" placeholder="Topic" />
							</div>
							<div className="form-group">
								<label>Start Year</label>
								<input type="text" className="form-control" id="Inputtext2" placeholder="Start Year" />
							</div>
							<div className="form-group">
								<label>End Year</label>
								<input type="text" className="form-control" id="Inputtext3" placeholder="End Year" />
							</div>
							
							<button type="submit" className="btn btn-warning">Submit</button>
							</form>
							{/*end bootstrap form*/}
							
						</div>
					</div>
					<Resutls />
				</div>
				
			</div>
		);
	}
});

module.exports = Search;
