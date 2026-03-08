import { useEffect, useRef, useState } from "react";
import { useFormStore } from "@/store/formStore";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SaveIndicator() {
  const { formData } = useFormStore();
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSaved(true);
      timerRef.current = setTimeout(() => setSaved(false), 2000);
    }, 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [formData]);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs text-slate-400 transition-opacity duration-300",
        saved ? "opacity-100" : "opacity-0",
      )}
    >
      <Check className="w-3 h-3 text-green-500" />
      Draft saved
    </div>
  );
}
