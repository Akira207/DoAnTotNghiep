import Header from "../components/layouts/DefaultLayout/Header";
import Footer from "../components/layouts/DefaultLayout/Footer";
import LoginForm from "../components/layouts/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-300">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}