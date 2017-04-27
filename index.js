'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//display heading
function getHeader() {
  return React.createElement(
    'div',
    { className: 'headBar' },
    'freeCodeCamp'
  );
}

//make panel containing ranking, user name, points in last month, and all time points
function Panels(props) {
  return React.createElement(
    'tr',
    { className: 'panel' },
    React.createElement(
      'td',
      null,
      props.index + 1
    ),
    React.createElement(
      'td',
      null,
      React.createElement(
        'a',
        { href: 'https://www.freecodecamp.com/' + props.userName, target: '_blank' },
        React.createElement('img', { className: 'imageStyle', src: props.picture, alt: 'User Profile Picture' })
      ),
      React.createElement(
        'a',
        { href: 'https://www.freecodecamp.com/' + props.userName, target: '_blank' },
        props.userName
      )
    ),
    React.createElement(
      'td',
      { className: 'points' },
      props.recentPoint
    ),
    React.createElement(
      'td',
      { className: 'points' },
      props.allPoint
    )
  );
}

//component to create the title of the table, with sortable effect on month point and all time points

var TableTitle = function (_React$Component) {
  _inherits(TableTitle, _React$Component);

  function TableTitle() {
    _classCallCheck(this, TableTitle);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      //by default show rank of users by recent month points
      onRecent: true
    };
    _this.changeList = _this.changeList.bind(_this);
    _this.renderRecent = _this.renderRecent.bind(_this);
    _this.renderAllTime = _this.renderAllTime.bind(_this);
    return _this;
  }

  //change the list between recent and all time

  TableTitle.prototype.changeList = function changeList() {
    if (this.state.onRecent) {
      this.props.getAllTimePoints();
      this.setState({
        onRecent: false
      });
    } else {
      this.props.getRecPoints();
      this.setState({
        onRecent: true
      });
    }
  };

  TableTitle.prototype.renderRecent = function renderRecent() {
    return React.createElement(
      'tr',
      { className: 'panel' },
      React.createElement(
        'th',
        { width: '10%' },
        '#'
      ),
      React.createElement(
        'th',
        { width: '40%' },
        'Camper Name'
      ),
      React.createElement(
        'th',
        { width: '25%', className: 'pointsTitle' },
        'Points in past 30 days▼'
      ),
      React.createElement(
        'th',
        { width: '25%', className: 'pointsTitle', onClick: this.changeList },
        'All time points'
      )
    );
  };

  TableTitle.prototype.renderAllTime = function renderAllTime() {
    return React.createElement(
      'tr',
      { className: 'panel' },
      React.createElement(
        'th',
        { width: '10%' },
        '#'
      ),
      React.createElement(
        'th',
        { width: '40%' },
        'Camper Name'
      ),
      React.createElement(
        'th',
        { className: 'pointsTitle', width: '25%', onClick: this.changeList },
        'Points in past 30 days'
      ),
      React.createElement(
        'th',
        { className: 'pointsTitle', width: '25%' },
        'All time points▼'
      )
    );
  };

  TableTitle.prototype.render = function render() {
    if (this.state.onRecent) {
      return this.renderRecent();
    } else {
      return this.renderAllTime();
    }
  };

  return TableTitle;
}(React.Component);

//assemles the table, holds the api call results

var Table = function (_React$Component2) {
  _inherits(Table, _React$Component2);

  function Table() {
    _classCallCheck(this, Table);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this2.state = {
      pointsArr: []
    };
    _this2.getRecentPoint = _this2.getRecentPoint.bind(_this2);
    _this2.getAllPoints = _this2.getAllPoints.bind(_this2);
    _this2.makeTable = _this2.makeTable.bind(_this2);
    return _this2;
  }

  //helps with call to fcc api, such that it doesn't render table without getting the api result

  Table.prototype.componentDidMount = function componentDidMount() {
    this.getRecentPoint();
  };

  //api call to get recent month point

  Table.prototype.getRecentPoint = function getRecentPoint() {
    return $.ajax({
      url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      success: function (result) {
        this.setState({ pointsArr: result });
      }.bind(this)
    });
  };

  //api call to get all time points

  Table.prototype.getAllPoints = function getAllPoints() {
    return $.ajax({
      url: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
      success: function (result) {
        this.setState({ pointsArr: result });
      }.bind(this)
    });
  };

  //assemble each row for the the table using Panel component

  Table.prototype.makeTable = function makeTable(eachPerson, i) {
    return React.createElement(Panels, {
      key: i,
      index: i,
      userName: eachPerson['username'],
      recentPoint: eachPerson['recent'],
      allPoint: eachPerson['alltime'],
      picture: eachPerson['img']
    });
  };

  Table.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'completeTable' },
      React.createElement(
        'div',
        { className: 'leaderBoardTitle' },
        'Leaderboard'
      ),
      React.createElement(
        'table',
        { className: 'userTable' },
        React.createElement(TableTitle, { getAllTimePoints: this.getAllPoints, getRecPoints: this.getRecentPoint }),
        this.state.pointsArr.map(this.makeTable)
      )
    );
  };

  return Table;
}(React.Component);

//component for footer

function getFooter() {
  return React.createElement(
    'div',
    { className: 'footer' },
    'Made By BXR'
  );
}

//final assembling of different components

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component3.call(this));
  }

  App.prototype.render = function render() {
    var holdHeader = getHeader();
    var holdFooter = getFooter();
    return React.createElement(
      'div',
      null,
      holdHeader,
      React.createElement(Table, null),
      holdFooter
    );
  };

  return App;
}(React.Component);

//final render

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));