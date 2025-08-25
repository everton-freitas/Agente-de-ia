import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Chat, ChatContainer, ChatHistory, Input, Text, History, TextUser } from "./styles";
import { Chats, Info, PaperPlaneRight } from "phosphor-react";
import botAvatar from "../../assets/bot-avatar.png"
import userAvatar from "../../assets/user-chatbot.png"


function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

   useEffect(() => {
    setMessages([{
      sender: "bot", text: "👋 Olá! Eu sou seu professor virtual de programação. O que você gostaria de aprender hoje?"
    }])
   }, [])

   useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessage = async () => {
    if (!input) return;

    
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    try {
      const res = await axios.post(
        "http://95.216.142.66:5678/webhook/chatbot",
        { message: input },
        { headers: { "Content-Type": "application/json" } }
      );

      // Adiciona resposta do bot
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Desculpe, não consegui responder." },
      ]);
    }

    
  };

  return (
      <ChatContainer>
        
        <ChatHistory>
          {messages.map((m, i) => (
            <History key={i}>
              {m.sender === "user" && (
                <TextUser style={{ textAlign: "right" }}>
                  <Text  style={{ whiteSpace: "pre-line" }} sender={m.sender}>{m.text}</Text>
                  <img 
                    src={userAvatar}
                    alt="user"
                    style={{ width:"40px", height: "40px", borderRadius: "6.7px",     alignSelf: "end", marginBottom: "0.2rem"}}
                  />
                </TextUser>
              )}

              {m.sender === "bot" && (
                <p style={{ textAlign: "left" }}>
                  
                  <img
                    src={botAvatar}
                    alt="bot"
                    style={{ width:"40px", height: "40px", borderRadius: "6.7px", alignSelf: "end", marginBottom: "0.2rem"}}
                  />
                  <Text style={{ whiteSpace: "pre-line" }} sender={m.sender}>{m.text}</Text>
                  <div ref={messagesEndRef} />
                </p>
                
              )}
            </History>

             
          ))}
        </ChatHistory>

        <Chat>
          <Input
            minRows={1}
            maxRows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
          />
          <Button onClick={sendMessage}>
            <PaperPlaneRight size={26} />
          </Button>
        </Chat>
      </ChatContainer>
  );
}

export default Chatbot;
