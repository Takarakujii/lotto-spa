import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, User, Clock, HelpCircle, LogOut } from "lucide-react";
import "../style/Navbar.css";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topNavItems = [
    {
      icon: <Home />,
      label: "HOME",
      path: "/home",
      hoverColor: "text-cyan-400 hover:text-cyan-200",
    },
    {
      icon: <Clock />,
      label: "HISTORY",
      path: "/draw-history",
      hoverColor: "text-yellow-400 hover:text-yellow-200",
    },
    {
      icon: <HelpCircle />,
      label: "HELP",
      path: "/help",
      hoverColor: "text-white hover:text-gray-200",
    },
  ];

  const bottomNavItems = [
    {
      icon: <User />,
      label: "PROFILE",
      path: "/profile",
      hoverColor: "text-fuchsia-400 hover:text-fuchsia-200",
    },
    {
      icon: <LogOut />,
      label: "LOGOUT",
      path: "/login",
      hoverColor: "text-red-400 hover:text-red-200",
    },
  ];

  const handleNavigation = (path) => {
    if (path === "/login") {
      localStorage.removeItem("token");
    }
    navigate(path);
  };

  // Mobile v
  if (isMobile) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 py-2 px-4 flex justify-around items-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,20,40,0.9) 0%, rgba(30,30,60,0.9) 100%)",
          boxShadow:
            "0 0 20px rgba(100,0,255,0.3), inset 0 0 15px rgba(50,0,100,0.5)",
          borderTop: "2px solid rgba(0,255,255,0.3)",
        }}
      >
        {[...topNavItems, ...bottomNavItems].map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              className={`flex flex-col items-center p-2 cursor-pointer rounded-lg ${
                isActive ? "bg-purple-800/50" : ""
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {React.cloneElement(item.icon, {
                className: `transition-all duration-300 ${item.hoverColor}`,
                size: 24,
              })}
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop
  return (
    <div
      className={`fixed top-0 right-0 h-screen z-50 transition-all duration-300 ${
        isExpanded ? "w-48" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{
        background:
          "linear-gradient(135deg, rgba(20,20,40,0.9) 0%, rgba(30,30,60,0.9) 100%)",
        boxShadow:
          "0 0 20px rgba(100,0,255,0.3), inset 0 0 15px rgba(50,0,100,0.5)",
        borderTopLeft: "2px solid rgba(0,255,255,0.3)",
        borderBottomLeft: "2px solid rgba(0,255,255,0.3)",
        borderLeft: "2px solid rgba(0,255,255,0.3)",
        borderRadius: "12px 0 0 12px",
      }}
    >
      <div className="h-full flex flex-col justify-between p-2">
        {/* Top section */}
        <div>
          {topNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={`top-${index}`}
                className={`flex items-center p-3 m-1 cursor-pointer transition-all duration-300 rounded-lg group ${
                  isExpanded ? "hover:bg-gray-700/50" : ""
                } ${isActive ? "bg-purple-800/50" : ""}`}
                onClick={() => handleNavigation(item.path)}
              >
                <div
                  className={`flex items-center ${isExpanded ? "mr-3" : ""} ${
                    item.hoverColor
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    className:
                      "transition-all duration-300 group-hover:scale-110",
                    size: 24,
                  })}
                </div>
                {isExpanded && (
                  <span
                    className={`text-sm font-bold transition-all duration-300 ${item.hoverColor}`}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div>
          {bottomNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={`bottom-${index}`}
                className={`flex items-center p-3 m-1 cursor-pointer transition-all duration-300 rounded-lg group ${
                  isExpanded ? "hover:bg-gray-700/50" : ""
                } ${isActive ? "bg-purple-800/50" : ""}`}
                onClick={() => handleNavigation(item.path)}
              >
                <div
                  className={`flex items-center ${isExpanded ? "mr-3" : ""} ${
                    item.hoverColor
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    className:
                      "transition-all duration-300 group-hover:scale-110",
                    size: 24,
                  })}
                </div>
                {isExpanded && (
                  <span
                    className={`text-sm font-bold transition-all duration-300 ${item.hoverColor}`}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
