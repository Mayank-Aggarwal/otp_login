import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

// This is User Signin Component
const SignIn = ({ loginSubmit, otpSubmit, viewOtpForm, phoneNumber }) => {
  const mobile = !!(window.innerWidth < 768);
  const [otp, setOTP] = useState("");
  useEffect(() => {
    if(otp.length === 6) {
      otpSubmit(otp);
    }
  }, [otp])
  return (
    <div className="wrapper" style={{ maxWidth: mobile ? '360px' : '580px', padding: mobile ? '2rem' : '5rem' }}>
      <h1 className="main-heading">Sign in</h1><br></br>
      <p className="sub-text">Sign in using your mobile number.</p>
      {!viewOtpForm ? (
        <div className="form-wrapper">
          <form id="loginForm" onSubmit={loginSubmit}>
            <div className="input-field">
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                autoComplete="false"
                maxLength="10"
              />
            </div>
            <button className="main-button" type="submit" id="sign-in-button">
              Sign in
            </button>
          </form>
        </div>
      ) : (
        <div className="form-wrapper" onSubmit={otpSubmit}>
          <form id="otpForm">
            <div className="input-field">
              <label>Enter the otp sent to : {phoneNumber}</label>
              <OtpInput
                value={otp}
                onChange={otp => setOTP(otp)}
                numInputs={6}
                inputStyle={{ width: mobile ? '' : '3rem', height: mobile ? '' : '5rem'}}
                containerStyle={{ width: '100%', justifyContent: 'space-between' }}
              />
            </div>
            <button onClick={() => window.open("/signin", "_self")}>Change Number</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
