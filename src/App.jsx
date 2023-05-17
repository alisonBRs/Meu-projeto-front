import { Header } from "./components/Header";
import { Container } from "./pages/Container";
import { Footer } from "./components/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Projects } from "./pages/Projects";
import { CreateProject } from "./pages/CreateProject";
import { useState } from "react";
import { Modal } from "./components/modal/Modal";

function App() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <Router>
      <Header />
      <Container showToast={showMessage}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sobre" element={<About />} />
          <Route path="contato" element={<Contact />} />
          <Route path="projetos" element={<Projects />} />
          <Route
            path="projeto"
            element={<CreateProject showToast={setShowMessage} />}
          />
          <Route path="projetos/:id" element={<Modal />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
