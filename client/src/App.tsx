import { Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import NewTodo from './components/NewTodo'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/newtodo' element={<NewTodo/>}/>
      </Routes>
    </div>
  )
}

export default App
