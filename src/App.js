import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [activeSection, setActiveSection] = useState('new-chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onCollapseChange={setSidebarCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        // Desktop behavior
        'lg:' + (sidebarCollapsed ? 'ml-24' : 'ml-80')
      }`}>
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