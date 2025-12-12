import { useState } from "react";
import IPhoneFrame from "./device/iPhoneFrame";
import TabBar from "./device/TabBar";
import HomeScreen from "./screens/HomeScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import SkillsScreen from "./screens/SkillsScreen";
import ResumeScreen from "./screens/ResumeScreen";
import ContactScreen from "./screens/ContactScreen";

const PortfolioApp = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={setActiveTab} />;
      case "projects":
        return <ProjectsScreen onNavigate={setActiveTab} />;
      case "skills":
        return <SkillsScreen />;
      case "resume":
        return <ResumeScreen />;
      case "contact":
        return <ContactScreen />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <IPhoneFrame>
      <div className="relative h-full">
        {renderScreen()}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </IPhoneFrame>
  );
};

export default PortfolioApp;
