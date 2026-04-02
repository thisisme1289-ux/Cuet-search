/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CUETLookup from "./components/CUETLookup";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">C</span>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">CUET<span className="text-indigo-600">Guide</span></span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">Universities</a>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">Courses</a>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors">Syllabus</a>
              <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        <CUETLookup />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 py-12 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                  <span className="text-white font-black text-xs">C</span>
                </div>
                <span className="text-lg font-black text-gray-900 tracking-tight">CUET<span className="text-indigo-600">Guide</span></span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                Empowering students with accurate, real-time eligibility data for CUET UG admissions. Built with advanced AI to simplify your university journey.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">NTA Portal</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">DU Bulletin</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">BHU Admissions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 font-medium">© 2026 CUETGuide. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 font-medium">Built for Students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
