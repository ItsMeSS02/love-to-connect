import React from "react"; // ✅ add this
import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen flex items-center justify-center "
      data-theme={theme}
    >
      <LoaderIcon className="animate-spin w-10 h-10 text-primary" />
    </div>
  );
};

export default PageLoader;
