import { useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../sokect";
import { useOutletContext } from "react-router-dom";

export default function ChatView() {

  const [textareaInput, setTextareaInput] = useState("");

  const [messages, setMessages] = useOutletContext();

  console.log(messages);

  const { id1, id2 } = useParams();
  console.log(id2)
  console.log(id1)

  const handleSend = () => {
    setMessages([...messages, { content: textareaInput, to: id2 }]);
    socket.emit("private message", { content: textareaInput, to: id2 });
    setTextareaInput("");
  }


  return (
    <div className="w-2/3 h-full" >
      <div className="h-5/6 w-full">
        {messages.length > 0 && messages.filter(message => message.to === id1 || message.from === id2).map((message, index) => {
          return (
            <>
            <div key={index}>
              {message.hasOwnProperty("to")? <p>to</p>: <p>from</p>}
              {message.content}
            </div>
            </>
          )

        })}
      </div>
      <div className="flex items-center h-1/6">
        <textarea className=" resize-none h-3/4 w-full mx-4 border-2 border-gray-400" type="text" value={textareaInput} onChange={(e) => setTextareaInput(e.target.value)} />
        <button className="mr-4" type="button" onClick={handleSend}>send</button>
      </div>

    </div>
  )
}
