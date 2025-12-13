"use client";

import { useState } from "react";
import IPhoneFrame from "./device/iPhoneFrame";
import TabBar from "./device/TabBar";
import HomeScreen from "./screens/HomeScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import SkillsScreen from "./screens/SkillsScreen";
import ResumeScreen from "./screens/ResumeScreen";
import ContactScreen from "./screens/ContactScreen";

interface PortfolioAppProps {
  showFrame?: boolean;
}

const PortfolioApp = ({ showFrame = true }: PortfolioAppProps) => {
  const [activeTab, setActiveTab] = useState("home");

  // En mode fullscreen, on cache la StatusBar des screens
  const hideStatusBar = !showFrame;

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={setActiveTab} hideStatusBar={hideStatusBar} />;
      case "projects":
        return <ProjectsScreen onNavigate={setActiveTab} hideStatusBar={hideStatusBar} />;
      case "skills":
        return <SkillsScreen hideStatusBar={hideStatusBar} />;
      case "resume":
        return <ResumeScreen hideStatusBar={hideStatusBar} />;
      case "contact":
        return <ContactScreen hideStatusBar={hideStatusBar} />;
      default:
        return <HomeScreen onNavigate={setActiveTab} hideStatusBar={hideStatusBar} />;
    }
  };

  const content = (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} isFullscreen={hideStatusBar} />
    </div>
  );

  // Mode fullscreen (mobile réel) : pas de cadre
  if (!showFrame) {
    return (
      <div className="fixed inset-0 bg-background overflow-hidden">
        {content}
      </div>
    );
  }

  // Mode normal : avec cadre iPhone
  return <IPhoneFrame>{content}</IPhoneFrame>;
};

export default PortfolioApp;
