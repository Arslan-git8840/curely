import React from "react";
import Link from "next/link";
import {
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  HeartPulse,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#e0f7f4] to-[#ccf1ee] pt-12 pb-6 px-4 md:px-16 rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 text-[#014d40] text-2xl font-bold">
            <HeartPulse size={24} /> Curely
          </div>
          <p className="text-sm text-[#475569] mt-2">
            Your AI-powered medical assistant. Book consults, generate reports,
            and take control of your wellness — smarter and faster.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[#0f172a] font-semibold mb-3">Quick Links</h4>
          <ul className="text-sm text-[#475569] space-y-2">
            <li>
              <Link href="/" className="hover:text-[#019c6f] transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/create" className="hover:text-[#019c6f] transition">
                Create Consultant
              </Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-[#019c6f] transition">
                Reports
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#019c6f] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[#0f172a] font-semibold mb-3">Stay Informed</h4>
          <p className="text-sm text-[#475569] mb-3">
            Join our newsletter for the latest health updates and AI tools.
          </p>
          <form className="flex items-center rounded-full overflow-hidden border border-gray-200 bg-white">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 text-sm w-full outline-none text-[#0f172a]"
            />
            <button
              type="submit"
              className="bg-[#019c6f] hover:bg-[#017a59] text-white px-4 py-2 flex items-center gap-1 text-sm"
            >
              <Mail size={16} /> Subscribe
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-[#0f172a] font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-[#019c6f]">
            <Link href="#"><Facebook size={20} /></Link>
            <Link href="#"><Twitter size={20} /></Link>
            <Link href="#"><Linkedin size={20} /></Link>
            <Link href="#"><Instagram size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t pt-4 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Curely Health AI. All rights reserved.
      </div>
    </footer>
  );
}
