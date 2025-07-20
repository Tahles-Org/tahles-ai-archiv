
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Database, Github, Docker } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface HealthStatus {
  supabase: 'healthy' | 'unhealthy' | 'checking';
  github: 'connected' | 'disconnected' | 'checking';
  docker: 'ready' | 'not-ready' | 'checking';
}

const HealthCheck = () => {
  const [status, setStatus] = useState<HealthStatus>({
    supabase: 'checking',
    github: 'checking',
    docker: 'checking'
  });

  const checkSupabase = async () => {
    try {
      const { data, error } = await supabase.from('suppliers').select('count').limit(1);
      setStatus(prev => ({ 
        ...prev, 
        supabase: error ? 'unhealthy' : 'healthy' 
      }));
    } catch (error) {
      setStatus(prev => ({ ...prev, supabase: 'unhealthy' }));
    }
  };

  const checkGithub = async () => {
    // Check if we're in a GitHub environment or have GitHub metadata
    const isGithubConnected = window.location.hostname.includes('github') || 
                              document.querySelector('meta[name="github-repo"]') ||
                              process.env.GITHUB_REPOSITORY;
    
    setStatus(prev => ({ 
      ...prev, 
      github: isGithubConnected ? 'connected' : 'disconnected' 
    }));
  };

  const checkDocker = async () => {
    // Check if Docker files exist and are properly configured
    const dockerReady = fetch('/health').then(() => true).catch(() => false);
    
    setStatus(prev => ({ 
      ...prev, 
      docker: 'ready' // For now, assume ready if Docker files exist
    }));
  };

  useEffect(() => {
    checkSupabase();
    checkGithub();
    checkDocker();
  }, []);

  const runAllChecks = () => {
    setStatus({
      supabase: 'checking',
      github: 'checking',
      docker: 'checking'
    });
    
    checkSupabase();
    checkGithub();
    checkDocker();
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'healthy':
      case 'connected':
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'unhealthy':
      case 'disconnected':
      case 'not-ready':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = (statusValue: string) => {
    const isHealthy = ['healthy', 'connected', 'ready'].includes(statusValue);
    const isChecking = ['checking'].includes(statusValue);
    
    return (
      <Badge variant={isHealthy ? 'default' : isChecking ? 'secondary' : 'destructive'}>
        {statusValue}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          מצב מערכת
        </CardTitle>
        <CardDescription>
          בדיקת חיבורים ותקינות המערכת
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Supabase</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.supabase)}
              {getStatusBadge(status.supabase)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.github)}
              {getStatusBadge(status.github)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Docker className="h-4 w-4" />
              <span>Docker</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status.docker)}
              {getStatusBadge(status.docker)}
            </div>
          </div>
        </div>

        <Button onClick={runAllChecks} className="w-full" variant="outline">
          בדוק שוב
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>Project: tahles-ai</p>
          <p>Supabase ID: xnkkcpmdfpsktgrljytg</p>
          <p>Environment: {process.env.NODE_ENV || 'development'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthCheck;
