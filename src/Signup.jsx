






import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { Link } from 'react-router-dom';  

const API = process.env.REACT_APP_API_URL;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // ✅ Fix 1: username → name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert('Password aur Confirm Password match nahi kar rahe!');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/signup/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password
      }); 

      const userId = res.data.user_id;
      console.log(res.data); // ✅ Fix 2: response → res
      navigate(`/verify-otp/${userId}`);

    } catch (err) {
      console.log("API URL:", API);
      alert(err.response?.data?.message || err.response?.data?.error || 'Signup fail hua, dobara try karo');
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
        .outer { margin: 50px; margin-top: 70px; }
        .top-headings {
          max-width: 860px;
          margin-left: 300px;
          margin-bottom: 14px;
          text-align: center;
        }
        .top-headings h1 {
          font-size: 22px; font-weight: 700;
          color: #1a2a4a; margin-bottom: 6px;
        }
        .top-headings h2 {
          font-size: 15px; font-weight: 400; color: #5a6a88;
        }
        .box {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          max-width: 860px;
          margin-left: 300px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          min-height: 560px;
        }
        .form-side {
          padding: 40px 36px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .form-side h3 {
          font-size: 26px; font-weight: 700;
          color: #1a2a4a; text-align: center; margin-bottom: 6px;
        }
        .subtitle {
          color: #9aa3b8; font-size: 13.5px;
          text-align: center; margin-bottom: 26px;
        }
        .input-wrap { position: relative; margin-bottom: 15px; }
        .input-wrap input {
          width: 100%; height: 48px;
          padding: 0 42px 0 14px;
          border: 1.5px solid #d0d8ec;
          border-radius: 10px; font-size: 14px;
          color: #1a2a4a; outline: none;
          background: transparent; font-family: inherit;
          transition: border-color 0.2s;
        }
        .input-wrap input:focus { border-color: #2979cc; }
        .input-wrap input::placeholder { color: #aab2c4; }
        .eye-icon {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          cursor: pointer; color: #aab2c4;
          background: none; border: none;
          padding: 0; display: flex; align-items: center;
        }
        .submit-btn {
          width: 100%; background-color: #1e3a5f;
          color: white; padding: 14px; border: none;
          border-radius: 10px; cursor: pointer;
          font-size: 15px; font-weight: 600;
          font-family: inherit; margin-top: 6px;
          margin-bottom: 16px; letter-spacing: 0.3px;
          transition: background 0.2s;
        }
        .submit-btn:hover { background-color: #163050; }
        .submit-btn:disabled { background-color: #7a9cbf; cursor: not-allowed; }
        .login-link { text-align: center; font-size: 13px; color: #9aa3b8; }
        .login-link a { color: #2979cc; text-decoration: none; font-weight: 500; }
        .terms {
          font-size: 11.5px; color: #aab2c4;
          text-align: center; margin-top: 18px; line-height: 1.6;
        }
        .terms a { color: #2979cc; text-decoration: none; }
        .image-side { position: relative; overflow: hidden; }
        .image-side img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .image-side::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(10,30,60,0.45) 0%, rgba(0,0,0,0.25) 100%);
        }
        .image-text {
          position: absolute; bottom: 30px;
          left: 24px; right: 24px; z-index: 2; color: white;
        }
        .image-text h4 {
          font-size: 20px; font-weight: 700;
          margin-bottom: 6px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .image-text p {
          font-size: 13px;
          color: rgba(255,255,255,0.8); line-height: 1.5;
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="outer">
        <div className="top-headings">
          <h1>Welcome to Fitness Club Management System</h1>
          <h2>Sign Up to Start Your Fitness Journey</h2>
        </div>

        <div className="box">
          <div className="form-side">
            <h3>Sign Up</h3>
            <p className="subtitle">Let's get started with your Fitness Club</p>

            <form onSubmit={handleSubmit}>

              <div className="input-wrap">
                <input
                  type="text" placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-wrap">
                <input
                  type="email" placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="eye-icon" onClick={() => setShowPass(!showPass)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>

              <div className="input-wrap">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Please wait...' : 'Sign Up'}
              </button>

            </form>

            <div className="login-link">
              Already have an account? <Link to="/login">Log In</Link>
            </div>

            <p className="terms">
              By signing up to create an account I accept<br />
              Company's <Link to="/terms">Terms of Use and Privacy Policy</Link>.
            </p>
          </div>

          <div className="image-side">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" alt="Fitness Club" />
            <div className="image-text">
              <h4>Transform Your Body</h4>
              <p>Join thousands of members achieving their fitness goals every day.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signup;



