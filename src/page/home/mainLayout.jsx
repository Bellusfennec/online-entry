import Navbar from "../../common/components/navbar/navbar";
import Container from "../../common/components/wrapper/contaner";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white">
        <Container>
          <Navbar />
        </Container>
      </header>
      <main className="grow my-10">
        <Container>{children}</Container>
      </main>
      <footer className="shrink-0 bg-white">
        <Container>футер</Container>
      </footer>
    </div>
  );
};

export default MainLayout;
