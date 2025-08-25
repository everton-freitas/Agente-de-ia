import { Route, Routes } from 'react-router-dom'
import Chatbot  from './pages/Chatbot'
import { DefaultLayout } from './layouts'
import About from './pages/Sobre'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path='/' element={<Chatbot />} />
        <Route path='/sobre' element={<About /> }/>   
      </Route>
    </Routes>
  )
}