import { Button, Chat, ChatContainer, ChatHistory, History, Image, Input, Text, TextUser } from "../Chatbot/styles"
import evertonAvatar from "../../assets/foto-everton-chatbot.jpeg"
import { Heart } from "phosphor-react"
import { useState } from "react"
import { HeartFill, HeartRegular } from "./styles"

function About() {

    const [ShowLike, setShowLike] = useState(false)

    const handleToggle = () => {
        setShowLike(!ShowLike)
    }

    return (
        <ChatContainer>
            <ChatHistory>
                <History>
                    <TextUser style={{ justifyContent: "start" }}>
                        <Image
                            src={evertonAvatar}
                            alt="bot"
                            style={{ width: "40px", height: "40px", borderRadius: "6.7px", alignSelf: "end", marginBottom: "0.2rem" }}
                        />
                        <Text style={{ whiteSpace: "pre-line", borderLeft: "3px solid #00875F" }}>
                            <strong>Sobre o Projeto</strong><br />
                            Este chatbot foi desenvolvido como um projeto de estudo em desenvolvimento web.
                            O sistema utiliza inteligência artificial para auxiliar o usuário em suas interações,
                            oferecendo respostas automáticas em uma interface simples, responsiva e de fácil utilização.


                            <br /><br /><strong>Tecnologias Utilizadas</strong><br /><br />
                            • React.js para construção da interface e gerenciamento de estados.<br />
                            • Styled Components para estilização dinâmica e componentizada.<br />
                            • n8n, utilizado Agente de IA e integrando com a API da OpenAI,
                            possibilitando o processamento inteligente das mensagens enviadas pelo usuário.
                            <br /><br /><strong>Desenvolvedor: Everton Freitas</strong>
                            
                        {ShowLike ? (<HeartFill show={ShowLike} color="#d94f5a" size={24} weight="fill"/>) : ( <HeartRegular color="#d94f5a" size={24} /> ) }   
                        </Text>
                         
                    </TextUser>
                </History>

            </ChatHistory>

            <Chat>
                 <div style={{ position: "relative", width: "100%" }}>
                <Input
                    minRows={1}
                    maxRows={8}
                    placeholder="Gostou do projeto? deixe seu like!"
                    disabled
                />
                <Button style={{ zIndex: 9999}} variant="like" onClick={handleToggle}>
                    
                    <Heart size={20} />
                </Button>
                </div>
            </Chat>
        </ChatContainer>
    )
}

export default About