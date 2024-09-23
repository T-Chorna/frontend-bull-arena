import './App.css'
import ArenaWithBull from './components/ArenaWithBull'
import Matador from './components/Matador'
// import OldMatador from './components/OldMatador'

function App() {
  return (
    <div className="App">
      <ArenaWithBull
        matador={<Matador applause={-1} setMatarodPosition={function (): React.Dispatch<React.SetStateAction<number>> {
          throw new Error('Function not implemented.')
        } } matadorPosition={4} />} />
    </div>
  )
}

export default App
