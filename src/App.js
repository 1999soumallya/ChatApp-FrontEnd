import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import ErrorPage from './Pages/404Page';
import ForgotPassword from './Pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/chats' element={<ChatPage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
