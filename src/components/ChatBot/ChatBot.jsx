import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import styles from "./ChatBot.module.css";

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "bot",
      message: "Bună! Cum te pot ajuta?",
      timestamp: new Date().getTime(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [awaitingBotResponse, setAwaitingBotResponse] = useState(false);
  const chatMessagesRef = useRef(null);

  const handleToggleChat = () => {
    setShowChat((prevState) => !prevState);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const userMessage = {
        id: chatHistory.length + 1,
        sender: "user",
        message: userInput,
        timestamp: new Date().getTime(),
      };
      setChatHistory((prevHistory) => [...prevHistory, userMessage]);
      setUserInput("");
      setAwaitingBotResponse(true);
    }
  };

  const chatDatabase = useMemo(() => [
    { question: "Cum te numești?", answer: "Sunt un chatbot." },
    { question: "Ce faci?", answer: "Stau aici și aștept întrebările tale!" },
    { question: "Ce produse oferiți?", answer: "Oferim o varietate de produse, inclusiv îmbrăcăminte, accesorii, încălțăminte și multe altele. Pentru a vedea gama noastră completă, vizitați pagina noastră de produse." },
    { question: "Care sunt metodele de plată acceptate?", answer: "Acceptăm plata cu cardul de credit/debit, PayPal și plata la livrare în anumite zone." },
    { question: "Cum pot verifica starea comenzii mele?", answer: "Pentru a verifica starea comenzii, vă rugăm să accesați secțiunea 'Contul meu' și să vizitați pagina 'Comenzile mele'." },
    { question: "Ce opțiuni de livrare oferiți?", answer: "Oferim livrare standard și livrare express. Timpul de livrare poate varia în funcție de locație și tipul de livrare selectat." },
    { question: "Pot returna un produs?", answer: "Da, acceptăm returnarea produselor în termen de 30 de zile de la primirea comenzii. Asigurați-vă că produsul se află în starea sa originală și aveți chitanța de cumpărare." },
    { question: "Cum pot contacta serviciul clienți?", answer: "Puteți să ne contactați prin pagina 'Contact' de pe site-ul nostru sau să ne trimiteți un e-mail la support@magazinulmeu.com." },
    // Adaugă mai multe întrebări și răspunsuri aici
  ], []);

  const searchDatabaseForAnswer = useCallback((question, database) => {
    const matchedQuestion = database.find(
      (item) => item.question.toLowerCase() === question.toLowerCase()
    );

    if (matchedQuestion) {
      return matchedQuestion.answer;
    } else {
      return "Scuze, nu pot răspunde la această întrebare.";
    }
  }, []);

  const handleChatResponse = useCallback((message) => {
    const response = searchDatabaseForAnswer(message, chatDatabase);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        id: prevHistory.length + 1,
        sender: "bot",
        message: response,
        timestamp: new Date().getTime(),
      },
    ]);
    setAwaitingBotResponse(false);
  }, [searchDatabaseForAnswer, chatDatabase]);

  useEffect(() => {
    const chatResponseElement = document.getElementById("chat-response");
    if (chatResponseElement) {
      chatResponseElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatHistory.slice(-1)[0].sender === "user" && !loading && awaitingBotResponse) {
      setLoading(true);
      const lastUserMessage = chatHistory.slice(-1)[0].message;
      setTimeout(() => {
        setLoading(false);
        handleChatResponse(lastUserMessage);
      }, 500);
    }
  }, [chatHistory, loading, awaitingBotResponse, handleChatResponse]);

  return (
    <div className={styles.chatBotContainer}>
      <button className={styles.chatButton} onClick={handleToggleChat}>
        <FontAwesomeIcon icon={faComment} className={styles.chatIcon} />
      </button>
      {showChat && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>ChatBot</h3>
            <button onClick={handleToggleChat}>&times;</button>
          </div>
          <div className={styles.chatBody}>
            <div className={styles.chatMessages} ref={chatMessagesRef}>
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={chat.sender === "bot" ? styles.botMessage : styles.userMessage}
                >
                  <div className={styles.messageText}>{chat.message}</div>
                  <div className={styles.messageTime}>
                    {new Date(chat.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
              {loading && <div className={styles.loading}>Se încarcă...</div>}
              <div id="chat-response" />
            </div>
            <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Tastează mesajul tău..."
                value={userInput}
                onChange={handleUserInput}
              />
              <button onClick={handleSendMessage}>Trimite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
