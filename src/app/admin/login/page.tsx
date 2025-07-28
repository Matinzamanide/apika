'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost/apitak/admin/admin_login.php', {
        method: 'POST',
        credentials: 'include', // 👈 خیلی مهم
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('admin', JSON.stringify({ username }));
      router.push('/admin/dashboard');
    } else {
      setError(data.error || 'ورود ناموفق');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">ورود ادمین</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          ورود
        </button>
      </form>
    </div>
  );
}
