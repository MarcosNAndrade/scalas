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
      <div style={{position: "fixed", top: "2%", left: "2%"}}><img src="logo_scalas.fw.png" width="50%" height="50%" /></div>
          <h1><span style={{fontSize: "150%", color: "#000000"}}>Nosso site está em construção</span></h1>
    </main>
  );
}

export default App;
