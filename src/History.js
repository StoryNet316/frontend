import React from 'react';
import { LinearProgress } from 'material-ui/Progress';

import HistoryList from './HistoryList';


const History = () => (
  <div>
    <LinearProgress mode="determinate" value="100" color="accent"/>
    <h1>Your Top 10 Most Recent Stor.ios</h1>
    <HistoryList/>
  </div>
)

export default History;