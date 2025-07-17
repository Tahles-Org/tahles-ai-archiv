import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, ArrowLeft } from "lucide-react";

const HomePage = () => {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ברוך הבא למערכת תכל'ס</h1>
        <p className="text-muted-foreground text-lg mb-6">מערכת ניהול ספקים ושירותים עבור חברתך</p>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button asChild size="lg">
            <Link to="/supplier-registration">
              <Users className="ml-2 h-5 w-5" />
              רישום ספקים
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="ml-2 h-5 w-5" />
              חזרה לדף הראשי
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;