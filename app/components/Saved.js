var React = require("react");
var Saved = React.createClass({
    render: function(){
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Saved</h3>
                        </div>
                        <div className="panel-body">
                           <div id="saved">
                               save this
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

 module.exports = Saved;
