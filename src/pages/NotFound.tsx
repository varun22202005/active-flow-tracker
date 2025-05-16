
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-fitness text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-display font-bold mb-4">404</h1>
        <p className="text-xl mb-6">
          Oops! It looks like you've wandered off the trail.
        </p>
        <p className="mb-8 text-white/80">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-white text-fitness-blue hover:bg-white/90">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
