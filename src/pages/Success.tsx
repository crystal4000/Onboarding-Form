import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          You're all set!
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Thanks for completing the onboarding. We'll be in touch shortly based
          on your preferences.
        </p>
        <Button
          type="button"
          onClick={() => navigate("/onboarding/1")}
          variant="outline"
          className="w-full cursor-pointer"
        >
          Start over
        </Button>
      </div>
    </div>
  );
}
