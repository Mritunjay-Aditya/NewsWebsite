import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="text-center space-y-4 py-12">
      <h1 className="text-4xl font-black text-white">Page not found</h1>
      <p className="text-slate-300">We could not locate that page. Please return to the newsroom.</p>
      <Button asChild variant="ghost" className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-400/10">
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2 inline" /> Back to home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
