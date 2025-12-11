import { Home, FolderOpen, Layers, Mail } from "lucide-react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Accueil", icon: Home },
  { id: "projects", label: "Projets", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 pb-8">
      {/* Glass Background */}
      <div className="mx-2 rounded-2xl glass-card">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`ios-tab-item ${isActive ? "active" : ""}`}
              >
                <Icon 
                  className={`h-6 w-6 transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabBar;
