import { useRef, useState } from 'react';
import './App.css';

let OTP = 0;

function App() {
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleOtpGenerated = () => {
    setShowVerification(true);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return (
    <div className="app-container">
      {isVerified ? (
        <div className="welcome-container">
          <h1 className="welcome-message">Welcome!</h1>
          <div className="confetti">
            {[...Array(30)].map((_, i) => <div key={i} className="confetti-piece" />)}
          </div>
          <p className="welcome-subtext">You have successfully verified your phone number.</p>
        </div>
      ) : !showVerification ? (
        <OtpGeneration onOtpGenerated={handleOtpGenerated} />
      ) : (
        <OtpVerification onVerificationSuccess={handleVerificationSuccess} />
      )}
    </div>
  );
}

function OtpGeneration({ onOtpGenerated }) {
  const [phonenumber, setPhonenumber] = useState('');

  const handlePhone = (e) => {
    setPhonenumber(e.target.value);
  };

  function generateOTP() {
    if (!phonenumber) {
      alert('Please enter a phone number');
      return;
    }
    OTP = Math.floor(1000 + Math.random() * 9000);
    console.log("Generated OTP:", OTP);
    onOtpGenerated();
  }

  return (
    <div className="otp-generation-container">
      <h1 className="title">Enter Your Mobile Number</h1>
      <div className="input-group">
        <input
          type="tel"
          placeholder="Enter phone number"
          onChange={handlePhone}
          className="phone-input"
        />
        <button onClick={generateOTP} className="send-otp-btn">
          Send OTP
        </button>
      </div>
    </div>
  );
}

function OtpVerification({ onVerificationSuccess }) {
  const otp1 = useRef();
  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();
  const [error, setError] = useState('');

  const HandleOtp = (e, nextref) => {
    if (e.target.value.length === 1 && nextref) {
      nextref.current.focus();
    }
  };

  const handleKeyDown = (e, prevRef) => {
    if (e.key === 'Backspace' && e.target.value === '' && prevRef) {
      prevRef.current.focus();
    }
  };

  const getOtp = () => {
    const enteredOtp =
      otp1.current.value +
      otp2.current.value +
      otp3.current.value +
      otp4.current.value;
    
    console.log("Entered OTP:", enteredOtp);
    
    if (enteredOtp.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }

    if (parseInt(enteredOtp) === OTP) {
      setError('');
      onVerificationSuccess();
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-verification-container">
      <h2 className="verification-title">Enter Verification Code</h2>
      <p className="verification-subtext">We've sent a 4-digit code to your phone</p>
      
      <div className="otp-inputs">
        <input 
          ref={otp1} 
          maxLength={1} 
          onInput={(e) => HandleOtp(e, otp2)} 
          onKeyDown={(e) => handleKeyDown(e, null)}
          className="otp-digit"
        />
        <input 
          ref={otp2} 
          maxLength={1} 
          onInput={(e) => HandleOtp(e, otp3)} 
          onKeyDown={(e) => handleKeyDown(e, otp1)}
          className="otp-digit"
        />
        <input 
          ref={otp3} 
          maxLength={1} 
          onInput={(e) => HandleOtp(e, otp4)} 
          onKeyDown={(e) => handleKeyDown(e, otp2)}
          className="otp-digit"
        />
        <input 
          ref={otp4} 
          maxLength={1} 
          onKeyDown={(e) => handleKeyDown(e, otp3)}
          className="otp-digit"
        />
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <button onClick={getOtp} className="verify-btn">
        Verify
      </button>
    </div>
  );
}

export default App;