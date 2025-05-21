import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <div style={{position: "fixed", top: "2%", left: "2%", }}><img src="logo_scalas.fw.png" width="100%" height="100%" /></div>
      <h1><span style={{fontSize: "150%", color: "#FF8000"}}>S</span><span style={{fontSize: "120%", color: "#000000"}}>cala</span><span style={{fontSize: "150%", color: "#FF8000"}}>S</span></h1>
      <button onClick={createTodo}>+ OK</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 Nosso site está em construção.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Estamos na versão 1.0.0.
        </a>
      </div>
    </main>
  );
}

export default App;
