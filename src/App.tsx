import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnBoardingLayout from "@/pages/onboarding/OnBoardingLayout";
import Step1 from "@/pages/onboarding/Step1";
import Step2 from "@/pages/onboarding/Step2";
import Step3 from "@/pages/onboarding/Step3";
import Step4 from "@/pages/onboarding/Step4";
import Success from "@/pages/Success";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<OnBoardingLayout />}>
          <Route index element={<Navigate to="1" replace />} />
          <Route path="1" element={<Step1 />} />
          <Route path="2" element={<Step2 />} />
          <Route path="3" element={<Step3 />} />
          <Route path="4" element={<Step4 />} />
        </Route>
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Navigate to="/onboarding/1" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
