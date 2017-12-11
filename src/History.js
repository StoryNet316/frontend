import React , { Component }  from 'react';

import HistoryList from './HistoryList';




class History extends Component {

  constructor(props){
    super(props)

  }


  render() {
    return (
      <div>
        <h1>Your Top 10 Most Recent Stor.ios</h1>
        <HistoryList currentUser={this.props.currentUser}/>

      </div>
    )

  }

}



export default History;