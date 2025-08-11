// src/components/Sidebar.js
import { FileText, User, Briefcase, Users, Bell, Settings } from 'lucide-react';

const sidebarItems = [
  { icon: <FileText size={20} />, label: 'Resume Upload', active: false },
  { icon: <User size={20} />, label: 'Profile', active: false },
  { icon: <Briefcase size={20} />, label: 'Job Feed', active: false },
  { icon: <Users size={20} />, label: 'Applications', active: false },
  { icon: <Bell size={20} />, label: 'Notifications', active: false },
  { icon: <Settings size={20} />, label: 'Settings', active: false }
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Complete Profile Section */}
      <div className="p-4 mt-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Complete your profile</h3>
          <p className="text-sm text-blue-600 mb-3">Add more details to improve job matches</p>
          <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
          </div>
          <span className="text-xs text-blue-600">75% complete</span>
        </div>
      </div>
    </aside>
  );
}