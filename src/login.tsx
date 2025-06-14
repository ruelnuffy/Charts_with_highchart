import React, { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { useNavigate } from 'react-router-dom';


interface MouseHoverEffectProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  followSpeed?: number;
  enabled?: boolean;
}

const MouseHoverEffect: React.FC<MouseHoverEffectProps> = ({
  color = "#00ffff",
  size = 400,
  blur = 80,
  opacity = 0.8,
  followSpeed = 0.15,
  enabled = true,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (enabled) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled]);

  useEffect(() => {
    document.title = "Data Collection | Login";
  }, []);

  useEffect(() => {
    const animateFollow = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * followSpeed,
        y: prev.y + (mousePosition.y - prev.y) * followSpeed,
      }));
    };

    const animationFrame = requestAnimationFrame(animateFollow);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, followSpeed]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          width: `${size * 1.2}px`,
          height: `${size * 1.2}px`,
          background: `radial-gradient(circle, transparent 70%, ${color}22 80%, transparent 100%)`,
          borderRadius: "50%",
          filter: `blur(${blur * 1.5}px)`,
          transform: `translate(${smoothPosition.x - (size * 1.2) / 2}px, ${
            smoothPosition.y - (size * 1.2) / 2
          }px)`,
          opacity: opacity * 0.6,
        }}
      />

      {/* Main glow effect */}
      <div
        style={{
          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${color}CC 0%, ${color}66 30%, ${color}33 60%, transparent 100%)`,
          borderRadius: "50%",
          filter: `blur(${blur}px)`,
          transform: `translate(${smoothPosition.x - size / 2}px, ${
            smoothPosition.y - size / 2
          }px)`,
          animation: "mousePulse 2s ease-in-out infinite",
        }}
      />

      {/* Inner bright core */}
      <div
        style={{
          position: "absolute",
          width: `${size / 3}px`,
          height: `${size / 3}px`,
          background: `radial-gradient(circle, ${color}FF 0%, ${color}AA 50%, transparent 100%)`,
          borderRadius: "50%",
          filter: `blur(${blur / 3}px)`,
          transform: `translate(${smoothPosition.x - size / 6}px, ${
            smoothPosition.y - size / 6
          }px)`,
        }}
      />

      {/* Sparkle effects */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            background: color,
            borderRadius: "50%",
            filter: "blur(1px)",
            transform: `translate(${
              smoothPosition.x + Math.cos((i * Math.PI) / 3) * 60 - 2
            }px, ${smoothPosition.y + Math.sin((i * Math.PI) / 3) * 60 - 2}px)`,
            animation: `sparkle ${1 + i * 0.2}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function FuturisticLogin(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setMounted(true);
  }, []);

const handleSubmit = async (): Promise<void> => {
  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Password length validation
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  setIsLoading(true);

  try {
    // Simulate API call (replace with actual authentication)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // On successful authentication, navigate to dashboard
    navigate('/screens/dashboard', {
  state: {
    userEmail: email,
    loginTime: new Date().toISOString()
  }
});
    
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const containerStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
    margin: 0,
    boxSizing: "border-box",
  };

  const backgroundOrbStyle1: CSSProperties = {
    position: "absolute",
    top: "10%",
    left: "15%",
    width: "20rem",
    height: "20rem",
    background: "rgba(6, 182, 212, 0.08)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "pulse 4s ease-in-out infinite",
  };

  const backgroundOrbStyle2: CSSProperties = {
    position: "absolute",
    bottom: "15%",
    right: "20%",
    width: "28rem",
    height: "28rem",
    background: "rgba(139, 92, 246, 0.06)",
    borderRadius: "50%",
    filter: "blur(100px)",
    animation: "pulse 5s ease-in-out infinite 1s",
  };

  const backgroundOrbStyle3: CSSProperties = {
    position: "absolute",
    top: "60%",
    left: "70%",
    width: "16rem",
    height: "16rem",
    background: "rgba(59, 130, 246, 0.05)",
    borderRadius: "50%",
    filter: "blur(60px)",
    animation: "pulse 3s ease-in-out infinite 0.5s",
  };

  const gridOverlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    opacity: 0.4,
  };

  const mainContainerStyle: CSSProperties = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "28rem",
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(2rem)",
    transition: "all 1s ease-out",
  };

  const glowBorderStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
    borderRadius: "1rem",
    filter: "blur(6px)",
    opacity: 0.7,
    animation: "borderGlow 4s ease-in-out infinite",
    backgroundSize: "400% 400%",
  };

  const formContainerStyle: CSSProperties = {
    position: "relative",
    background: "rgba(15, 15, 35, 0.85)",
    backdropFilter: "blur(32px)",
    border: "1px solid rgba(6, 182, 212, 0.3)",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.1)",
  };

  const headerStyle: CSSProperties = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const iconContainerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "4rem",
    height: "4rem",
    background: "linear-gradient(45deg, #06b6d4, #3b82f6)",
    borderRadius: "50%",
    marginBottom: "1rem",
    boxShadow:
      "0 10px 25px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)",
    animation: "iconGlow 3s ease-in-out infinite",
  };

  const titleStyle: CSSProperties = {
    fontSize: "1.875rem",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #22d3ee, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    marginBottom: "0.5rem",
    textShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
  };

  const subtitleStyle: CSSProperties = {
    color: "#94a3b8",
    fontSize: "0.875rem",
  };

  const inputGroupStyle: CSSProperties = {
    position: "relative",
    marginBottom: "1.5rem",
  };

  const inputIconStyle: CSSProperties = {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
    transition: "color 0.3s ease",
    pointerEvents: "none",
    zIndex: 2,
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    paddingLeft: "2.5rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    background: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(51, 65, 85, 0.6)",
    borderRadius: "0.5rem",
    color: "white",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
    backdropFilter: "blur(8px)",
  };

  const passwordInputStyle: CSSProperties = {
    ...inputStyle,
    paddingRight: "3rem",
  };

  const eyeButtonStyle: CSSProperties = {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  };


  const footerStyle: CSSProperties = {
    textAlign: "center",
    marginTop: "1.5rem",
  };

  const linkStyle: CSSProperties = {
    color: "#22d3ee",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
    background: "none",
    border: "none",
  };

  const statusStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.5rem",
    gap: "0.5rem",
  };

  const statusDotStyle: CSSProperties = {
    width: "0.5rem",
    height: "0.5rem",
    background: "#22c55e",
    borderRadius: "50%",
    animation: "pulse 2s ease-in-out infinite",
    boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
  };

  const statusTextStyle: CSSProperties = {
    fontSize: "0.75rem",
    color: "#94a3b8",
  };


  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = "#06b6d4";
    e.target.style.boxShadow =
      "0 0 0 2px rgba(6, 182, 212, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)";
    const icon = e.target.parentElement?.querySelector(
      "[data-icon]"
    ) as HTMLElement;
    if (icon) icon.style.color = "#06b6d4";
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = "rgba(51, 65, 85, 0.6)";
    e.target.style.boxShadow = "none";
    const icon = e.target.parentElement?.querySelector(
      "[data-icon]"
    ) as HTMLElement;
    if (icon) icon.style.color = "#64748b";
  };



  const handleLinkHover = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.color = "#0891b2";
    e.currentTarget.style.textShadow = "0 0 10px rgba(8, 145, 178, 0.5)";
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.color = "#22d3ee";
    e.currentTarget.style.textShadow = "none";
  };

  const handleEyeHover = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.color = "#06b6d4";
  };

  const handleEyeLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.color = "#64748b";
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes mousePulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes iconGlow {
          0%, 100% { box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.2); }
          50% { box-shadow: 0 10px 35px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.4); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        input::placeholder {
          color: #64748b;
        }
      `}</style>

      <div style={containerStyle}>
        {/* Mouse Hover Effect */}
        <MouseHoverEffect
          color="#06b6d4"
          size={350}
          blur={60}
          opacity={0.4}
          followSpeed={0.12}
        />

        {/* Background elements */}
        <div style={backgroundOrbStyle1}></div>
        <div style={backgroundOrbStyle2}></div>
        <div style={backgroundOrbStyle3}></div>
        <div style={gridOverlayStyle}></div>

        {/* Main container */}
        <div style={mainContainerStyle}>
          <div style={glowBorderStyle}></div>

          <div style={formContainerStyle}>
            {/* Header */}
            <div style={headerStyle}>
              <div style={iconContainerStyle}>
                <Shield size={32} color="white" />
              </div>
              <h1 style={titleStyle}>Data Bank</h1>
              <p style={subtitleStyle}>Secure Data Visualizations Login</p>
            </div>

            {/* Email Input */}
            <div style={inputGroupStyle}>
              <User size={20} style={{ ...inputIconStyle }} data-icon />
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="Email"
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>

            {/* Password Input */}
            <div style={inputGroupStyle}>
              <Lock size={20} style={{ ...inputIconStyle }} data-icon />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                style={passwordInputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
                onMouseEnter={handleEyeHover}
                onMouseLeave={handleEyeLeave}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
       <button
  onClick={handleSubmit}
  disabled={isLoading}
  style={{
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    backgroundColor: "#06b6d4",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    marginTop: "1.5rem",
  }}
>
  {isLoading ? "Logging in..." : "Login"}
</button>
            {/* Footer */}
            <div style={footerStyle}>
              <div style={{ marginBottom: "0.75rem" }}>
                <button
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  onClick={() => alert("Forgot password")}
                >
                  Forgot your Passowrd?
                </button>
              </div>
              <div style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
                <span>New to our Platform? </span>
                <button
                  style={linkStyle}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  onClick={() => alert("Registration")}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Status */}
            <div style={statusStyle}>
              <div style={statusDotStyle}></div>
              <span style={statusTextStyle}>Data Collection Active</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
