import { useState, useEffect, useRef } from "react";

type Msg = {
  text: string;
  sender: "user" | "bot";
};

export default function App() {
  const [messages, setMessages] = useState<Msg[]>([
    { text: "Olá! Cole seu currículo aqui e eu analiso para você. Se quiser, me diga também a vaga que está buscando! 📄", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Msg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, mode: "default" }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Erro ao conectar com o servidor.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  const resetChat = async () => {
    await fetch("http://127.0.0.1:8000/chat/reset", { method: "DELETE" });
    setMessages([
      { text: "Conversa reiniciada! Cole um novo currículo quando quiser. 📄", sender: "bot" }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}>📄</div>
        <div style={{ flex: 1 }}>
          <div style={styles.headerTitle}>IA da Lívia</div>
          <div style={styles.headerSub}><span style={styles.dot} />IA online</div>
        </div>
        <button style={styles.resetBtn} onClick={resetChat}>🔄 Nova análise</button>
      </div>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={{ ...styles.msg, ...(msg.sender === "user" ? styles.user : styles.bot) }}>
            {msg.text}
          </div>
        ))}
        {loading && <div style={{ ...styles.msg, ...styles.bot, color: "#5a5a6e", fontStyle: "italic" }}>Analisando...</div>}
        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cole seu currículo ou faça uma pergunta..."
        />
        <button style={styles.button} onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { display: "flex", flexDirection: "column", height: "100vh", maxWidth: 700, margin: "0 auto", fontFamily: "'Sora', sans-serif", background: "#0d0d0f" },
  header: { padding: "20px 24px", background: "#111113", borderBottom: "1px solid #222226", display: "flex", alignItems: "center", gap: 14 },
  avatar: { width: 42, height: 42, background: "linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  headerTitle: { fontSize: 15, fontWeight: 600, color: "#f0f0f4" },
  headerSub: { fontSize: 12, color: "#5a5a6e", marginTop: 2 },
  dot: { display: "inline-block", width: 7, height: 7, background: "#22c55e", borderRadius: "50%", marginRight: 5 },
  resetBtn: { background: "transparent", border: "1px solid #2a2a35", borderRadius: 10, padding: "8px 14px", color: "#c8c8d8", cursor: "pointer", fontSize: 12 },
  chatBox: { flex: 1, overflowY: "auto", padding: "20px 24px", background: "#0f0f12", display: "flex", flexDirection: "column", gap: 12 },
  msg: { maxWidth: "80%", padding: "12px 16px", borderRadius: 16, fontSize: 13.5, lineHeight: 1.7, whiteSpace: "pre-wrap" },
  user: { alignSelf: "flex-end", background: "linear-gradient(135deg,#6d28d9,#7c3aed)", color: "#f5f3ff", borderBottomRightRadius: 4 },
  bot: { alignSelf: "flex-start", background: "#1c1c22", color: "#c8c8d8", border: "1px solid #2a2a35", borderBottomLeftRadius: 4 },
  inputArea: { display: "flex", gap: 10, padding: "16px 20px", background: "#111113", borderTop: "1px solid #222226", alignItems: "center" },
  input: { flex: 1, background: "#0d0d0f", border: "1px solid #2a2a35", borderRadius: 12, padding: "11px 16px", color: "#e0e0ec", fontFamily: "inherit", fontSize: 13.5, outline: "none" },
  button: { background: "linear-gradient(135deg,#6d28d9,#7c3aed)", border: "none", borderRadius: 12, padding: "11px 20px", color: "#f5f3ff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" },
};