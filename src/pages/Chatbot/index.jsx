import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Chat, ChatContainer, ChatHistory, Input, Text, History, TextUser } from "./styles";
import { Chats, Info, PaperPlaneRight } from "phosphor-react";
import botAvatar from "../../assets/bot-avatar.png"
import userAvatar from "../../assets/user-chatbot.png"

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  // Componente de loading com pontinhos animados
  const LoadingDots = () => (
    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span>Compilito está digitando</span>
      <span style={{
        display: 'inline-block'
      }}>
        <span style={{ 
          opacity: '0.4',
          animation: 'loadingDot1 1.4s infinite'
        }}>.</span>
        <span style={{ 
          opacity: '0.4',
          animation: 'loadingDot2 1.4s infinite'
        }}>.</span>
        <span style={{ 
          opacity: '0.4',
          animation: 'loadingDot3 1.4s infinite'
        }}>.</span>
      </span>
      <style jsx>{`
        @keyframes loadingDot1 {
          0%, 60%, 100% { opacity: 0.4; }
          30% { opacity: 1; }
        }
        @keyframes loadingDot2 {
          0%, 60%, 100% { opacity: 0.4; }
          40% { opacity: 1; }
        }
        @keyframes loadingDot3 {
          0%, 60%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </span>
  );

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const messageToSend = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: messageToSend }]);
    setInput("");
    setIsLoading(true);

    // Adiciona mensagem de loading
    const loadingId = Date.now();
    setMessages((prev) => [...prev, { 
      sender: "bot", 
      text: "typing", 
      isLoading: true,
      id: loadingId 
    }]);

    try {
      const sessionId = localStorage.getItem("sessionId"); 

      const res = await axios.post(
        "https://27617ae48a47.ngrok-free.app/webhook/chat",
        { message: messageToSend, sessionId },
        { headers: { "Content-Type": "application/json" } }
      );

      // Remove mensagem de loading e adiciona resposta real
      setMessages((prev) => [
        ...prev.filter(msg => msg.id !== loadingId),
        { sender: "bot", text: res.data[0].output }
      ]);
    } catch (err) {
      console.error(err);
      // Remove mensagem de loading e adiciona mensagem de erro
      setMessages((prev) => [
        ...prev.filter(msg => msg.id !== loadingId),
        { sender: "bot", text: "Desculpe, não consegui responder." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Suporte ao Enter para enviar mensagem
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

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
                <Text style={{ whiteSpace: "pre-line" }} sender={m.sender}>
                  {m.isLoading ? (
                    <span style={{ 
                      color: '#666', 
                      fontStyle: 'italic'
                    }}>
                      <LoadingDots />
                    </span>
                  ) : (
                    m.text
                  )}
                </Text>
              </p>
            )}
          </History>
        ))}
        <div ref={messagesEndRef} />
      </ChatHistory>

      <Chat>
        <Input
          minRows={1}
          maxRows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua pergunta..."
          disabled={isLoading}
        />
        <Button onClick={sendMessage} disabled={isLoading}>
          <PaperPlaneRight 
            size={26} 
            color={isLoading ? '#ccc' : undefined} 
          />
        </Button>
      </Chat>
    </ChatContainer>
  );
}

export default Chatbot;