import Portal from './components/Portal';
import Scene from './components/Scene';

function App() {
  return (
    <div className='App'>
      <Scene>
        <Portal enabled={false} />
      </Scene>
    </div>
  );
}

export default App;
