import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.module.css';
import App from './App';

// Note curly braces didn't work!
// With parentheses you can write multiline JSX code.
const app = (
    <BrowserRouter><App /></BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

