import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

type DisputeReason = 
  | 'unauthorized_transaction'
  | 'counterfeit_card'
  | 'card_not_received'
  | 'fraudulent_multiple_charges'
  | 'other';

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    merchantName: '',
    transactionDate: '',
    transactionAmount: '',
    disputeReason: '' as DisputeReason,
    cardPresent: false,
    cardLost: false,
    cardStolen: false,
    dateReported: '',
    previouslyAuthorized: false,
    additionalDetails: '',
    bankRepName: '',
    bankRefNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const disputeId = Math.random().toString(36).substring(2, 15).toUpperCase();
    navigate('/confirmation', { state: { disputeId } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto terminal-container p-1">
        <div className="terminal-header p-4 mb-6 flex items-center gap-4">
          <Terminal className="w-8 h-8 text-white" />
          <div>
            <h1 className="terminal-title text-white">
              MASTERCARD FRAUD DISPUTE TERMINAL v1.0
            </h1>
            <div className="text-white text-xs">
              (C) 1988 MASTERCARD INTERNATIONAL
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="terminal-section p-4">
            <h2 className="text-lg mb-4">{'>'} BANK INFORMATION_</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">REPRESENTATIVE NAME:</label>
                <input
                  type="text"
                  name="bankRepName"
                  value={formData.bankRepName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm">REFERENCE #:</label>
                <input
                  type="text"
                  name="bankRefNumber"
                  value={formData.bankRefNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                />
              </div>
            </div>
          </div>

          <div className="terminal-section p-4">
            <h2 className="text-lg mb-4">{'>'} CARDHOLDER DATA_</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">NAME:</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm">CARD # (LAST 4):</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={4}
                  className="mt-1 block w-full px-2 py-1"
                />
              </div>
            </div>
          </div>

          <div className="terminal-section p-4">
            <h2 className="text-lg mb-4">{'>'} TRANSACTION INFO_</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm">MERCHANT:</label>
                <input
                  type="text"
                  name="merchantName"
                  value={formData.merchantName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm">DATE:</label>
                <input
                  type="date"
                  name="transactionDate"
                  value={formData.transactionDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                />
              </div>
              <div>
                <label className="block text-sm">AMOUNT:</label>
                <input
                  type="number"
                  name="transactionAmount"
                  value={formData.transactionAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="terminal-section p-4">
            <h2 className="text-lg mb-4">{'>'} DISPUTE DETAILS_</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm">REASON CODE:</label>
                <select
                  name="disputeReason"
                  value={formData.disputeReason}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                >
                  <option value="">SELECT REASON</option>
                  <option value="unauthorized_transaction">4837 - NO CARDHOLDER AUTHORIZATION</option>
                  <option value="counterfeit_card">4870 - CHIP LIABILITY SHIFT</option>
                  <option value="card_not_received">4863 - CARDHOLDER DOES NOT RECOGNIZE</option>
                  <option value="fraudulent_multiple_charges">4834 - DUPLICATE PROCESSING</option>
                  <option value="other">4999 - OTHER</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="cardPresent"
                    checked={formData.cardPresent}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm">CARD PRESENT [Y/N]</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="cardLost"
                    checked={formData.cardLost}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm">CARD LOST [Y/N]</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="cardStolen"
                    checked={formData.cardStolen}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm">CARD STOLEN [Y/N]</label>
                </div>
              </div>

              <div>
                <label className="block text-sm">DATE REPORTED:</label>
                <input
                  type="date"
                  name="dateReported"
                  value={formData.dateReported}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="previouslyAuthorized"
                  checked={formData.previouslyAuthorized}
                  onChange={handleInputChange}
                />
                <label className="text-sm">PREVIOUS AUTHORIZATION [Y/N]</label>
              </div>

              <div>
                <label className="block text-sm">NOTES:</label>
                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full px-2 py-1"
                  placeholder="ENTER ADDITIONAL DETAILS..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="terminal-button px-4 py-2"
              onClick={() => window.location.reload()}
            >
              [ESC] CANCEL
            </button>
            <button
              type="submit"
              className="terminal-button px-4 py-2"
            >
              [ENTER] SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;