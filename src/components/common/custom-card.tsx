/** @format */

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CardProps {
  title: string;
  icon?: React.ElementType;
  dollar?: React.ElementType;
  value: string | number;
  growth?: {
    percentage: number;
    period: string;
  };
  showIcon?: boolean;
  className?: string;
}

const CustomCard: React.FC<CardProps> = ({
  title,
  icon,
  dollar,
  value,
  growth,
  showIcon = true,
  className = "",
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === "number") {
      return val.toLocaleString();
    }
    return val;
  };

  const getGrowthColor = (percentage: number): string => {
    if (percentage > 0) return "text-green-500";
    if (percentage < 0) return "text-red-500";
    return "text-gray-500";
  };

  const getGrowthIcon = (percentage: number): React.ReactElement => {
    if (percentage > 0) return <TrendingUp size={16} />;
    if (percentage < 0) return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
    >
      {/* Header with title and icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary font-medium text-xl">{title}</h3>
        {showIcon && (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            {icon && (
              <span className="text-primary text-sm">
                {React.createElement(icon, { size: 18 })}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main value */}
      <div className="flex items-baseline gap-1">
        <span className=" flex justify-baseline text-3xl font-bold text-primary">
          {dollar && (
            <span className="text-primary font-bold mt-1.5 ">
              {React.createElement(dollar, { size: 28 })}
            </span>
          )}
          {formatValue(value)}
        </span>

        {/* Growth indicator (optional) */}
        {growth && (
          <div
            className={`flex items-center gap-2 mt-2 ${getGrowthColor(
              growth.percentage
            )}`}
          >
            <span className="flex items-center">
              {getGrowthIcon(growth.percentage)}
            </span>
            <span className="font-medium text-sm">
              {Math.abs(growth.percentage)}% growth of {growth.period}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCard;

// Usage Examples:
//
// 1. Simple card (like Image 1):
// <CustomCard
//   title="Paid Users"
//   value={5256}
// />
//
// 2. Card with growth (like Image 2):
// <CustomCard
//   title="Paid Users"
//   value="5,256"
//   growth={{ percentage: 20, period: "this month" }}
// />
//
// 3. Custom styling:
// <CustomCard
//   title="Paid Users"
//   value={5256}
//   growth={{ percentage: -5, period: "last week" }}
//   className="max-w-md hover:shadow-md transition-shadow"
// />
