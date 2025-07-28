'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for routing in Next.js
import { useAuthContext } from '@/context/AuthContext'; // Import AuthContext

const AuthFlow = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // Removed step 4 from the step state
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120); // 120 seconds = 2 minutes
  const [showResendButton, setShowResendButton] = useState(false); // State for showing resend button

  const router = useRouter(); // Use useRouter for routing
  // Use AuthContext to manage login status and user information
  const { isLoggedIn, setIsLoggedIn,  phoneNumber, setPhoneNumber } = useAuthContext();

  // Clear error message when step changes
  useEffect(() => {
    setError('');
  }, [step]);

  // Timer logic for OTP entry step
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResendButton(true); // Show resend button after timer expires
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [step, timer]);

  // Check user login status on component mount
  // In a real application, this would involve checking tokens from Local Storage or Cookies.
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/UserPanel'); // If user is already logged in, redirect to user panel
    }
  }, [isLoggedIn, router]); // Dependencies: isLoggedIn and router

  // Format time for timer display (e.g., 01:59)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Send OTP to the mobile number
  const handleSendOtp = async (isResend = false) => {
    setLoading(true);
    setError('');
    setShowResendButton(false); // Hide resend button when resending
    setTimer(120); // Reset timer
    try {
      const res = await fetch('http://localhost/apitak/auth/send_otp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ phone }),
      });
      const data = await res.json();
      if (data.otp) { // Assuming 'otp' in response indicates success
        if (!isResend) setStep(2); // Only go to step 2 on initial send
      } else {
        setError(data.message || 'مشکلی در ارسال کد تأیید پیش آمد.'); // Error message for OTP sending
      }
    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور.'); // Network error message
    } finally {
      setLoading(false);
    }
  };

  // Verify the entered OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost/apitak/auth/verify_otp.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ phone, code: otp }),
      });
      const data = await res.json();
      if (data.status === 'existing') {
        setIsLoggedIn(true); // Set login status to true
        setPhoneNumber(phone); // Store phone number in AuthContext
        // Store user's name and family in AuthContext
        // In a real application, store authentication token here (e.g., in Local Storage)
        // localStorage.setItem('authToken', data.token);
        router.push('/UserPanel'); // Redirect user to user panel
      } else if (data.status === 'new') {
        setIsNewUser(true);
        setStep(3); // If new user, go to registration step
      } else {
        setError(data.message || 'کد تأیید اشتباه است.'); // Error message for incorrect OTP
      }
    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور.'); // Network error message
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost/apitak/auth/register_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ phone, name, family }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true); // User registered and logged in!
        setPhoneNumber(phone); // Store phone number in AuthContext
        // Store user's name and family in AuthContext
        // In a real application, store authentication token here
        // localStorage.setItem('authToken', data.token);
        router.push('/UserPanel'); // Redirect user to user panel
      } else {
        setError(data.message || 'مشکلی در ثبت‌نام پیش آمد.'); // Error message for registration failure
      }
    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور.'); // Network error message
    } finally {
      setLoading(false);
    }
  };

  // Logout function (for use in user panel or testing)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhoneNumber(""); // Clear phone number from AuthContext
    setStep(1); // Return to login step
    setPhone(''); // Clear mobile number
    setOtp(''); // Clear OTP
    setName('');
    setFamily('');
    // localStorage.removeItem('authToken'); // Clear authentication token
    router.push('/'); // Redirect to home page or login page
  };

  // Common classes for buttons
  const buttonClass = (color: string) => `
    w-full ${color} text-white p-3 rounded-lg font-semibold
    transition duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
  `;

  // Common classes for input fields
  const inputClass = `
    w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition duration-200 ease-in-out
  `;

  // If the user is logged in, there's no need to display the AuthFlow form, as they will be redirected to userPanel.
  // This component is only rendered when the user is not logged in.
  if (isLoggedIn) {
    return null; // Or you can display a Loading Spinner
  }

  return (
    <div className="max-w-md p-8 bg-white shadow-xl rounded-2xl space-y-8 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        {step === 1 && "ورود / ثبت‌نام"}
        {step === 2 && "تأیید کد"}
        {step === 3 && "تکمیل اطلاعات"}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-slide-in-down" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Display login/registration form only if user is not logged in and is in step 1, 2, or 3 */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-gray-600 text-center">شماره موبایل خود را وارد کنید تا کد تأیید برای شما ارسال شود.</p>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="مثلاً 09123456789"
            className={inputClass}
            dir="rtl" // Right-to-left direction for mobile number input
          />
          <button
            onClick={() => handleSendOtp(false)}
            className={buttonClass('bg-blue-600 hover:bg-blue-700 focus:ring-blue-500')}
            disabled={loading}
          >
            {loading ? 'در حال ارسال...' : 'دریافت کد تأیید'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-gray-600 text-center">کد 6 رقمی ارسال شده به شماره **{phone}** را وارد کنید.</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="کد 6 رقمی"
            className={inputClass + ' text-center tracking-widest'} // Centered text and letter spacing for OTP
            maxLength={6}
            dir="ltr" // Left-to-right direction for OTP input
          />
          <div className="text-center text-sm font-medium animate-fade-in">
            {timer > 0 ? (
              <p className="text-gray-500">زمان باقی‌مانده: **{formatTime(timer)}**</p>
            ) : (
              <p className="text-red-500">زمان به پایان رسید.</p>
            )}
          </div>
          <button
            onClick={handleVerifyOtp}
            className={buttonClass('bg-green-600 hover:bg-green-700 focus:ring-green-500')}
            disabled={loading || timer === 0}
          >
            {loading ? 'در حال تأیید...' : 'تأیید کد'}
          </button>
          {showResendButton && (
            <button
              onClick={() => handleSendOtp(true)}
              className={buttonClass('bg-gray-500 hover:bg-gray-600 focus:ring-gray-400')}
              disabled={loading}
            >
              {loading ? 'در حال ارسال مجدد...' : 'ارسال مجدد کد'}
            </button>
          )}
        </div>
      )}

      {step === 3 && isNewUser && (
        <div className="space-y-6 animate-fade-in-up">
          <p className="text-gray-600 text-center">برای تکمیل ثبت‌نام، نام و نام خانوادگی خود را وارد کنید.</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام"
            className={inputClass}
          />
          <input
            type="text"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            placeholder="نام خانوادگی"
            className={inputClass}
          />
          <button
            onClick={handleRegister}
            className={buttonClass('bg-purple-600 hover:bg-purple-700 focus:ring-purple-500')}
            disabled={loading}
          >
            {loading ? 'در حال ثبت‌نام...' : 'ثبت نام و ورود'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthFlow;
