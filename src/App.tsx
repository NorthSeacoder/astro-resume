import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import LoadingIndicator from "./components/LoadingIndicator";

// 懒加载组件
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PerformanceMonitor = lazy(() => import("./components/PerformanceMonitor"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Suspense fallback={<LoadingIndicator />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PerformanceMonitor />
    </Suspense>
  </TooltipProvider>
);

export default App;
