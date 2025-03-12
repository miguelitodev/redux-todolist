import { Toaster } from "sonner";
import { Form } from "./components/Form";

function App() {
  return (
    <main className="flex justify-between flex-col items-center min-h-screen bg-[#F4F4F5] text-[#333333] text-left">
      <div>
        <Toaster richColors position="top-center" />
      </div>
      <Form />
      <span className="text-xs opacity-50 p-3">
        Made by{" "}
        <a className="font-bold" href="https://miguelito.dev">
          Miguel Riquelme
        </a>
      </span>
    </main>
  );
}

export default App;
