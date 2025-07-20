import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Activity, Users, Briefcase, Database, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [systemStatus, setSystemStatus] = useState<{
    providers: number;
    loading: boolean;
    error: string | null;
  }>({
    providers: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    console.log('Index component useEffect starting');
    const checkSystemStatus = async () => {
      console.log('Checking system status...');
      try {
        const { data, error } = await supabase
          .from('providers')
          .select('*');
        
        console.log('Supabase response:', { data, error });
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        setSystemStatus({
          providers: data?.length || 0,
          loading: false,
          error: null
        });
      } catch (err) {
        setSystemStatus({
          providers: 0,
          loading: false,
          error: err instanceof Error ? err.message : 'שגיאה בטעינת נתונים'
        });
      }
    };

    checkSystemStatus();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm"></div>
      </div>
      
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">ת</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">תכל'ס</h1>
        </div>
        
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost" className="text-foreground" asChild>
            <Link to="/supplier-registration">
              <Users className="w-4 h-4 ml-2" />
              ספקים
            </Link>
          </Button>
          <Button variant="ghost" className="text-foreground" asChild>
            <Link to="/home">
              <Briefcase className="w-4 h-4 ml-2" />
              שירותים
            </Link>
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            ברוכים הבאים למערכת
            <span className="text-primary block">תכל'ס</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            המקום המושלם למציאת ספקים מקצועיים ושירותים איכותיים לכל אירוע ופרויקט - מערכת מעודכנת
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="חפש ספקים, שירותים או קטגוריות..."
                  className="pl-12 pr-4 py-4 text-lg bg-background/80 backdrop-blur-sm border-2 border-muted"
                  dir="rtl"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              </div>
              <Button size="lg" className="px-8 py-4">
                חפש
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <Link to="/supplier-registration">
                <Users className="w-5 h-5 ml-2" />
                רישום ספקים
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-background/80 backdrop-blur-sm" asChild>
              <Link to="/home">
                <Database className="w-5 h-5 ml-2" />
                בדיקת מערכת
              </Link>
            </Button>
          </div>

          {/* System Status */}
          <div className="mt-8 p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-border max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Database className="w-4 h-4" />
              <span className="font-medium">מצב המערכת:</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              {systemStatus.loading ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span className="text-sm">בודק חיבור...</span>
                </>
              ) : systemStatus.error ? (
                <>
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-destructive">שגיאה בחיבור</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    {systemStatus.providers === 0 ? "מחובר - לא נמצאו ספקים" : `מחובר - ${systemStatus.providers} ספקים`}
                  </span>
                  <Badge variant={systemStatus.providers > 0 ? "default" : "secondary"} className="text-xs">
                    {systemStatus.providers > 0 ? "פעיל" : "ריק"}
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ספקים מקצועיים</h3>
            <p className="text-muted-foreground">מאגר עצום של ספקים מוכשרים ומאומתים</p>
          </div>
          
          <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">חיפוש מתקדם</h3>
            <p className="text-muted-foreground">מצא בדיוק מה שאתה מחפש עם מערכת סינון חכמה</p>
          </div>
          
          <div className="text-center p-6 bg-background/60 backdrop-blur-sm rounded-xl border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ניהול פרויקטים</h3>
            <p className="text-muted-foreground">כלים מתקדמים לניהול ומעקב אחר פרויקטים</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
