

function App() {
  localStorage.setItem('name', 'abdi');
  sessionStorage.setItem('name', 'abdi');
  document.cookie='name=Bahar; expires=' + (new Date(2024, 01, 05).toUTCString());

  return (
    <div className="App">
    <h1>Hello world</h1>
    </div>
  );
}

export default App;
