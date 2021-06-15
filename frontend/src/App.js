import React from 'react'
import './App.css';
import BankList from './components/BankList';
import SmsList from './components/SmsList';


function App() {
  return (
    <div className="App">
      <SmsList />
      <BankList />
    </div>
  );
}

export default App;