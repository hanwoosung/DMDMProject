import Header from "./components/layout/Header";
import "./index.css";
import Footer from "./components/layout/Footer";
import Aside from "./components/layout/Aside";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="content">
            </div>
            <Footer/>
        </div>
    );
}

export default App;
