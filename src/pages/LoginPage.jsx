import LoginForm from "../features/auth/LoginForm";
import LoginLeftPanel from "../features/auth/LoginLeftPanel";
import LoginFooter from "../features/auth/LoginFooter";

export default function LoginPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_-12px_rgba(35,44,81,0.08)] overflow-hidden border border-outline-variant/10">
          
          <LoginLeftPanel />
          <LoginForm />

        </div>
      </main>

      <LoginFooter />
    </div>
  );
}