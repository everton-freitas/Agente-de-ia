import { Button, Chat, ChatContainer, ChatHistory, History, Input, Text, TextUser } from "../Chatbot/styles"
import botAvatar from "../../assets/bot-avatar.png"
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
                        <img
                            src={botAvatar}
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
                            • n8n, utilizado para integrar a API da OpenAI,
                            possibilitando o processamento inteligente das mensagens enviadas pelo usuário.
                            <br /><br /><strong>Desenvolvedor: Everton Freitas</strong>
                            
                        {ShowLike ? (<HeartFill show={ShowLike} color="#d94f5a" size={26} weight="fill"/>) : ( <HeartRegular color="#d94f5a" size={26} /> ) }   
                        </Text>
                         
                    </TextUser>
                </History>

            </ChatHistory>

            <Chat>
                <Input
                    minRows={1}
                    maxRows={8}
                    placeholder="Gostei muito do seu trabalho"
                    disabled
                />
                <Button variant="like" onClick={handleToggle}>
                    
                    <Heart size={26} />
                </Button>
            </Chat>
        </ChatContainer>
    )
}

export default About