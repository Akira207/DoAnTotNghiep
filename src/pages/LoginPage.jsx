import LoginLeftPanel from "../features/auth/LoginLeftPanel";
import LoginForm from "../features/auth/LoginForm";
import LoginFooter from "../features/auth/LoginFooter";

function LoginPage() {
  return (
    <div className="bg-surface text-on-background min-h-screen flex flex-col">
      
      <main className="flex-grow flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        
        {/* Background blur */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-surface-container-high rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[50%] bg-primary-container rounded-full blur-[100px] opacity-20"></div>

        {/* Container */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 shadow-2xl rounded-lg overflow-hidden bg-surface-container-lowest border border-surface-container">

          <LoginLeftPanel />
          <LoginForm />

        </div>
      </main>

      <LoginFooter />
    </div>
  );
}

export default LoginPage;