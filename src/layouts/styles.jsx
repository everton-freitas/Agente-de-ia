import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;


   @media (max-width: 768px) {
    justify-content: center;
    margin-top: 0;
  }

  nav {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    @media (max-width: 768px) {
    flex-direction: row;
    justify-content: end;
  }

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;
      

      color: ${({ theme }) => theme['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transition: 0.3s;

      &:hover {
        border-bottom: 2px solid ${({ theme }) => theme['green-300']};
      }

      &.active {
        color: ${({ theme }) => theme['green-300']};
      }
    }
  }

  
`
export const Container = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
    flex-direction: column;
    background-color: ${({ theme }) => theme['gray-800']};
    
  }
`