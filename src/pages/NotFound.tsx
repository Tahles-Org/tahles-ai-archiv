import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 rounded-lg border border-border shadow-sm">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">הדף לא נמצא</p>
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            חזרה לדף הבית
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
