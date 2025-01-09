import React, { useEffect, useState } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [isOddGroupActive, setIsOddGroupActive] = useState(true); // Index of the currently pulsing square
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOddGroupActive((prev) => !prev); // Toggle the active group every 2 second
    }, 2000); // Change the pulse group every 2 second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 mt-10">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full bg-primary/10 overflow-hidden  ${
                (isOddGroupActive && i % 2 !== 0) ||
                (!isOddGroupActive && i % 2 === 0)
                  ? "animate-pulse"
                  : ""
              }`}
            >
              <img
                src={`https://avatar.iran.liara.run/public?id=${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
