import TodoContainer from "./components/TodoContainer"

function App() {

  return (
    <div className="bg-bg1 w-screen h-screen flex items-center justify-center text-white text-xl">
      <div className="text-center">
        <div className="mb-5 font-bold uppercase py-2">My Todos</div>
        <TodoContainer/>
      </div>
    </div>
  )
}

export default App
