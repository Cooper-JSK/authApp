import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App