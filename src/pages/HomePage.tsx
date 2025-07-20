
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Activity, Database, CheckCircle, XCircle } from "lucide-react";
import HealthCheck from "@/components/HealthCheck";
import { supabase } from "@/integrations/supabase/client";

interface Provider {
  id: string;
  name: string | null;
  calendar_connected: boolean | null;
  calendar_active: boolean | null;
}

const HomePage = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('providers')
        .select('*');

      if (fetchError) {
        throw fetchError;
      }

      setProviders(data || []);
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* כותרת ראשית */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-primary">בדיקת מערכת תכל'ס</h1>
        <p className="text-muted-foreground text-xl mb-8">מערכת ניהול ספקים ושירותים עבור חברתך</p>
      </div>

      {/* בדיקת חיבור למסד נתונים */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              בדיקת חיבור למסד נתונים
            </CardTitle>
            <CardDescription>
              בדיקה של חיבור ל-Supabase וטבלת הספקים
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 animate-spin" />
                <span>טוען נתונים...</span>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4" />
                <span>שגיאה: {error}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>
                  {providers.length === 0 
                    ? "לא נמצאו ספקים"
                    : `נמצאו ${providers.length} ספקים`
                  }
                </span>
                <Badge variant={providers.length > 0 ? "default" : "secondary"}>
                  {providers.length > 0 ? "פעיל" : "ריק"}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* כפתורי ניווט */}
      <div className="text-center mb-12">
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

      {/* בדיקת מערכת מלאה */}
      <div className="flex justify-center mt-12">
        <HealthCheck />
      </div>
    </div>
  );
};

export default HomePage;
