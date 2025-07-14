import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [activeSection, setActiveSection] = useState('new-chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile, visible on desktop */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      
      {/* Mobile Sidebar - overlay only on mobile */}
      <div className="lg:hidden">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-w-0 transition-all duration-300">
        <MainContent 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
    </div>
  );
}

export default App; 