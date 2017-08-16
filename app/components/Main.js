// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Main = React.createClass({
    render: function () {
        return (
        <div className="container">
            <div  className="jumbotron" id="backColor">
                <h2><strong>New York Times News Scrabber</strong></h2>
                <p><em>Search, Save and Annotate Articles of Interests!</em></p>
                <hr />
                {/*<p>
                    <Link to="/Child1"><button className="btn btn-primary btn-lg">Show Child #1</button></Link>
                    <Link to="/Child2"><button className="btn btn-danger btn-lg">Show Child #2</button></Link>
                </p>*/}
            </div>

            <div className="row">
                {this.props.children}
            </div>
        </div>
        );
    }
});
module.exports = Main;