import { NavLink, Outlet } from 'react-router-dom'
import { Container, HeaderContainer } from './styles'
import { Chats, Info } from 'phosphor-react'

export const DefaultLayout = () => {
  return (
    <Container>
      <HeaderContainer>
        <nav>
            <NavLink to="/">
                <Chats size={32}/>
            </NavLink>
            <NavLink to="/sobre">
                <Info size={32}/>
            </NavLink>
        </nav>
      </HeaderContainer>
      <main>
        <Outlet /> 
      </main>
    </Container>
  )
}