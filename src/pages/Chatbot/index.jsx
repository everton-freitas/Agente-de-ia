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
    let sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }
  }, []);


   useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    
    if (saved && saved !== "[]") {
      // Se existem mensagens salvas, carrega elas
      try {
        const parsedMessages = JSON.parse(saved);
        if (parsedMessages.length > 0) {
          setMessages(parsedMessages);
          return;
        }
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      }
    }
    
    // Se não há mensagens salvas ou array está vazio, define mensagem inicial
    setMessages([{
      sender: "bot", 
      text: "👋 Olá! Sou o Compilito, seu professor virtual de programação. O que você gostaria de aprender hoje?"
    }]);
  }, []);

  // Salvar mensagens no localStorage sempre que mudarem (exceto estado inicial vazio)
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
  }, [messages]);


  const sendMessage = async () => {
    if (!input) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    try {
      const sessionId = localStorage.getItem("sessionId"); 

      const res = await axios.post(
        "https://integralci-oculum.jhujt5.easypanel.host/webhook/chat",
        { message: input, sessionId },
        { headers: { "Content-Type": "application/json" } }
      );

      // Adiciona resposta do bot
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data[0].output },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Desculpe, não consegui responder." },
      ]);
    }
};

console.log(messages.bot)

return (
  <ChatContainer>

    <ChatHistory>
      {messages.map((m, i) => (
        <History key={i}>
          {m.sender === "user" && (
            <TextUser style={{ textAlign: "right" }}>
              <Text style={{ whiteSpace: "pre-line" }} sender={m.sender}>{m.text}</Text>
              <img
                src={userAvatar}
                alt="user"
                style={{ width: "40px", height: "40px", borderRadius: "6.7px", alignSelf: "end", marginBottom: "0.2rem" }}
              />
            </TextUser>
          )}

          {m.sender === "bot" && (
            <p style={{ textAlign: "left" }}>

              <img
                src={botAvatar}
                alt="bot"
                style={{ width: "40px", height: "40px", borderRadius: "6.7px", alignSelf: "end", marginBottom: "0.2rem" }}
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
