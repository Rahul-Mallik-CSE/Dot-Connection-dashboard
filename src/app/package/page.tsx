/** @format */

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import React from "react";

const PackagePage = () => {
  return (
    <div className="flex justify-center  bg-gray-100 p-4">
      <div className="w-full ">
        {/* Package Card */}
        <div
          className="relative rounded-2xl p-2 text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #ac12ce 0%, #bd29de 25%, #c941e6 50%, #9604b6 100%)`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 bg-white p-1 rounded-xl">
            <div></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-3 h-3 border-1 border-black rounded-full"></div>
              </div>
              <span className="text-lg font-medium text-primary">
                Life Time Member
              </span>
            </div>
            <div className="justify-end">
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white text-primary hover:bg-white/10 right-0"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>

          {/* Buy Button */}
          <div className="flex flex-col justify-center mx-auto items-center">
            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">$7</span>
                <span className="text-2xl line-through opacity-70">$10</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Tailored AI Match Suggestions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Longer Subscription Options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>In-Depth Match Progress Insights</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Elite Dating Plans</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Insider Dating Advice</span>
              </div>
            </div>
            <Button className="bg-white text-[#9604b6] hover:bg-white/90 px-8 py-2 rounded-xl font-medium mb-3">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
