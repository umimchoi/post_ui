import React, { Component } from 'react'
import './App.css';
import CustomizedInput from "./components/CustomizedInput";
import { Button, Container } from '@material-ui/core';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <PostList />
    </div>
  );
}

export default App;