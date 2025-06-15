
import React from 'react';
import FreemiumFeatures from './FreemiumFeatures';

const AuthBranding = () => {
  return (
    <div className="text-center lg:text-left text-white space-y-6">
      <div className="flex justify-center lg:justify-start mb-8">
        <img 
          src="/lovable-uploads/8a93fbb5-1382-4657-a4d4-5b7d659dcae3.png" 
          alt="Absolute-0.AI Logo" 
          className="h-32 w-32 rounded-full shadow-2xl"
        />
      </div>
      
      <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
        Welcome to<br />
        <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
          Absolute-0.AI
        </span>
      </h1>
      
      <p className="text-xl text-purple-200 leading-relaxed">
        The ultimate low/no-code solution designed for modern creative minds. 
        Build intelligent AI agents with zero coding required.
      </p>

      <FreemiumFeatures />
    </div>
  );
};

export default AuthBranding;
