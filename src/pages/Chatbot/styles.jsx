import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize"

export const ChatContainer = styled.div`
    background-color: ${(props) => props.theme['gray-800']};
    height: 90vh;
    width: 65vw;
    position: relative;
    border-radius: 6.7px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`

export const ChatHistory = styled.div`
    width: 100%;
    height: calc(100% - 11rem);
    margin-top: 3rem;
    overflow-y: auto; 
  overflow-x: hidden;  
  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.theme['green-500-trans']} #1a1a1a;
  padding-right: calc(10%);
  padding-left: calc(10%);
`

export const Chat = styled.div`
    padding-right: calc(11%);
    display: flex;
    justify-content: center;
    bottom: 3rem;
    gap: 2rem;
    width: 100%;
    margin-bottom: 3rem;
    padding-top: 0.7rem;
    padding-left: calc(10%);
`

export const Input = styled(TextareaAutosize)`
  background: transparent;
  border: 2px solid ${(props) => props.theme['gray-500']};
  width: 100%;
  border-radius: 6.7px;
  padding: 1rem 1.5rem;
  line-height: 1.4;
  resize: none;
  position: relative;
  z-index: 1000;
  color: ${(props) => props.theme['gray-100']};
    scrollbar-color: ${(props) => props.theme['green-500-trans']} #1a1a1a;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`

export const Button = styled.button`
    
  background-color: ${(props) => props.theme['green-500']};
  border: none;
  border-radius: 6.7px;
  padding: 0 1rem;
  height: 3.5rem;
  align-self: end;

  &:hover {
    transition: background-color 0.3s ;
    background-color: ${({variant, theme}) => variant === "like" ? "#d94f5a" : theme['green-500']};
  }

    &:hover svg {
    transition: color 0.3s ;
    color: ${({variant}) => variant === "like" ? "#ffffff" : "#000"};
  }
`

export const Text = styled.a`
  border-radius: 6.7px;
  position: relative;
  border-left: ${(props) =>
     props.sender === "bot" ? `3px solid ${props.theme['green-500']}`: "none"};
  border-right: ${(props) =>
     props.sender === "user" ? `3px solid ${props.theme['green-500']}`: "none"};
  line-height: 1.9;
  background: #000000;
  padding: 1rem 1.5rem;
  box-shadow: 0 0.129px 0.386px 0 rgba(0, 0, 0, 0.11), 0 0.687px 1.545px 0 rgba(0, 0, 0, 0.13);
  
`

export const History = styled.div`

  p {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.7rem;
  }
  
`

export const TextUser = styled.p`
    justify-content: end;
`

export const Header = styled.header`
  border: 1px solid white;
  height: 4rem;
  width: 80%;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`