"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, ShoppingBag, Info, Phone, Menu, X, ChevronDown, User, ShoppingCart } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false); // State for mega menu
  // Destructure userName and userFamily from AuthContext
  const { name, family, isLoggedIn, handleLogout } = useAuthContext(); // Assuming handleLogout is also available

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 py-2 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/apika2.svg" // Placeholder for apika2.svg
                  alt="APIKA Logo"
                  width={100}
                  height={40}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-6 rtl">
              <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-800 transition">
                <Home size={16} /> صفحه اصلی
              </Link>

              {/* Products Link with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductsMenuOpen(true)}
                onMouseLeave={() => setIsProductsMenuOpen(false)}
              >
                <Link href="/products" className="flex items-center py-7 gap-1 text-gray-700 hover:text-blue-800 transition cursor-pointer">
                  <ShoppingBag size={16} /> محصولات <ChevronDown size={16} className={`ml-1 transition-transform ${isProductsMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                </Link>

                {/* Mega Menu Content */}
                {isProductsMenuOpen && (
                  <div
                    className="absolute right-0 w-max rounded-xl shadow-lg p-6 grid grid-cols-2 gap-8 z-50 rtl"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
                      backdropFilter: 'blur(10px)', // Frosted glass effect
                      WebkitBackdropFilter: 'blur(10px)', // For Safari support
                      border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border
                    }}
                  >
                    {/* Category 1 */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">دسته بندی ۱</h3>
                      <ul className="space-y-2">
                        <li><Link href="/products/category1/item1" className="text-gray-700 hover:text-blue-800 transition block">محصول ۱.۱</Link></li>
                        <li><Link href="/products/category1/item2" className="text-gray-700 hover:text-blue-800 transition block">محصول ۱.۲</Link></li>
                        <li><Link href="/products/category1/item3" className="text-gray-700 hover:text-blue-800 transition block">محصول ۱.۳</Link></li>
                      </ul>
                    </div>

                    {/* Category 2 */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">دسته بندی ۲</h3>
                      <ul className="space-y-2">
                        <li><Link href="/products/category2/item1" className="text-gray-700 hover:text-blue-800 transition block">محصول ۲.۱</Link></li>
                        <li><Link href="/products/category2/item2" className="text-gray-700 hover:text-blue-800 transition block">محصول ۲.۲</Link></li>
                        <li><Link href="/products/category2/item3" className="text-gray-700 hover:text-blue-800 transition block">محصول ۲.۳</Link></li>
                      </ul>
                    </div>

                    {/* Add more categories or promotional content here */}
                    <div className="col-span-2 mt-4 pt-4 border-t border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">ویژه</h3>
                      <p className="text-gray-600 text-sm">
                        جدیدترین محصولات و پیشنهادات ویژه ما را کاوش کنید.
                      </p>
                      <Link href="/products/new-arrivals" className="mt-3 inline-block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm">
                        مشاهده همه محصولات
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/cart" className="flex items-center gap-1 text-gray-700 hover:text-blue-800 transition">
                <ShoppingCart size={16} /> سبد خرید
              </Link>
              <Link href="/contact" className="flex items-center gap-1 text-gray-700 hover:text-blue-800 transition">
                <Phone size={16} /> تماس با ما
              </Link>
            </nav>

            {/* Desktop User Panel / Login Button */}
            {isLoggedIn ? (
              <Link href="/UserPanel" className="hidden md:flex items-center text-gray-700 hover:text-blue-800 transition">
                <User size={20} className="ml-2" />
                <span className="font-semibold text-lg">{name} {family}</span>
              </Link>
            ) : (
              <div className="hidden md:flex">
                <Link
                  href="/Sign_in&up"
                  className="bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-900 transition"
                >
                  ورود | ثبت نام
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200 transition"
              aria-label="باز کردن منو"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop for Sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" // Lower z-index than sidebar
        />
      )}

      {/* Mobile Sidebar (Right-aligned) */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
          <Link href="/" className="flex items-center">
            <Image src="/apika2.svg" alt="APIKA Logo" width={100} height={40} /> {/* Placeholder */}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-gray-700 cursor-pointer hover:bg-gray-200 transition"
            aria-label="بستن منو"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col mt-4 space-y-4 px-4 rtl">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
          >
            <Home size={20} /> صفحه اصلی
          </Link>
          <Link
            href="/products"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
          >
            <ShoppingBag size={20} /> محصولات
          </Link>
          <Link
            href="/cart"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
          >
            <ShoppingCart size={20} /> سبد خرید
          </Link>
          <Link
            href="/about"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
          >
            <Info size={20} /> درباره ما
          </Link>
          <Link
            href="/contact"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
          >
            <Phone size={20} /> تماس با ما
          </Link>

          {/* Mobile User Panel / Login Button */}
          {isLoggedIn ? (
            <Link
              href="/UserPanel"
              onClick={() => setSidebarOpen(false)}
              className="mt-6 flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-xl font-semibold hover:bg-blue-200 transition"
            >
              <User size={20} /> {name} {family}
            </Link>
          ) : (
            <Link
              href="/Sign_in&up"
              onClick={() => setSidebarOpen(false)}
              className="mt-6 bg-blue-800 text-white px-4 py-2 rounded-xl text-center hover:bg-blue-900 transition"
            >
              ورود | ثبت نام
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}
