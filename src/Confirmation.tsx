import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Terminal, CheckCircle2 } from 'lucide-react';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { disputeId } = location.state || { disputeId: 'ERROR' };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto terminal-container p-1">
        <div className="terminal-header p-4 mb-6 flex items-center gap-4">
          <Terminal className="w-8 h-8 text-white" />
          <div>
            <h1 className="terminal-title text-white">
              DISPUTE CONFIRMATION
            </h1>
            <div className="text-white text-xs">
              (C) 1988 MASTERCARD INTERNATIONAL
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-[#00ff00]" />
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-xl">DISPUTE FILED SUCCESSFULLY</h2>
            <div className="terminal-section p-4">
              <p className="text-sm mb-2">REFERENCE ID:</p>
              <p className="text-2xl font-bold" id='disputeID'>{disputeId}</p>
            </div>
            <p className="text-sm">
              PLEASE RETAIN THIS ID FOR YOUR RECORDS
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => navigate('/')}
              className="terminal-button px-4 py-2"
            >
              [ESC] RETURN TO MAIN SCREEN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;