













import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function VerifyOtp() {
  const navigate = useNavigate();
  const { userId } = useParams(); // signup se aaya user id
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userId:", userId);  // ← ADD KARO
    console.log("otp:", otp)
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/verify-otp/${userId}/`, { otp });
      alert(res.data.message || 'OTP verified!');
      navigate('/dashboard'); // jahan bhi jana ho
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || 'OTP galat hai');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background-color: #eaecf5;
          font-family: 'Inter', Arial, sans-serif;
          min-height: 100vh;
        }
        .otp-page {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 100vh; width: 100%;
        }
        .top-heading { text-align: center; margin-bottom: 20px; }
        .top-heading h1 {
          font-size: 22px; font-weight: 700;
          color: #1a2a4a; margin-bottom: 6px;
        }
        .top-heading h2 {
          font-size: 15px; font-weight: 400; color: #5a6a88;
        }
        .box {
          background-color: white; border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 40px 40px 36px;
          width: 100%; max-width: 460px;
        }
        .box h3 {
          font-size: 22px; font-weight: 700;
          color: #1a2a4a; margin-bottom: 6px; text-align: center;
        }
        .subtitle {
          font-size: 13.5px; color: #9aa3b8;
          text-align: center; margin-bottom: 28px;
        }
        .label {
          font-size: 14px; font-weight: 600;
          color: #1a2a4a; margin-bottom: 8px; display: block;
        }
        .input-wrap { position: relative; margin-bottom: 20px; }
        .input-wrap input {
          width: 100%; height: 48px; padding: 0 14px;
          border: 1.5px solid #d0d8ec; border-radius: 10px;
          font-size: 15px; color: #1a2a4a; outline: none;
          background: transparent; font-family: inherit;
          letter-spacing: 3px; transition: border-color 0.2s;
        }
        .input-wrap input:focus { border-color: #1abc9c; }
        .input-wrap input::placeholder { color: #aab2c4; letter-spacing: 0px; }
        .verify-btn {
          width: 100%; background-color: #1abc9c;
          color: white; padding: 14px; border: none;
          border-radius: 10px; cursor: pointer;
          font-size: 15px; font-weight: 600;
          font-family: inherit; letter-spacing: 0.3px;
          transition: background 0.2s;
        }
        .verify-btn:hover { background-color: #17a589; }
        .verify-btn:disabled { background-color: #7dcfc4; cursor: not-allowed; }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="otp-page">

        <div className="top-heading">
          <h1>Welcome to Fitness Club Management System</h1>
          <h2>Verify Your OTP to See All Services in Our Fitness Club</h2>
        </div>

        <div className="box">
          <h3>Verify OTP</h3>
          <p className="subtitle">Enter the OTP sent to your registered email</p>

          <form onSubmit={handleSubmit}>
            <label className="label">OTP:</label>
            <div className="input-wrap">
              <input
                type="text" placeholder="Enter OTP"
                name="otp" maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="verify-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>

      </div>
    </>
  );
}

export default VerifyOtp;
   

