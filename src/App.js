import './App.css';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/register' element={<Login/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
