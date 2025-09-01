/** @format */

import React from "react";
import CustomCard from "@/components/common/custom-card";
import CustomTable from "@/components/common/custom-table";
import {
  Users,
  CreditCard,
  DollarSign,
  UserRoundX,
  ShieldUser,
} from "lucide-react";

import { userTableData } from "@/redux/data";

const cardData = [
  {
    title: "Total User",
    value: "25,256",
    icon: Users,
  },
  {
    title: "Free Users",
    value: "456",
    icon: UserRoundX,
  },
  {
    title: "Paid Users",
    value: "5,256",
    icon: ShieldUser,
  },
  {
    title: "Income",
    value: "75,256",
    dollar: DollarSign,
    icon: CreditCard,
  },
];

// Table configuration and data
const userTableColumns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "userType", header: "User Type" },
  { key: "email", header: "Email" },
  { key: "status", header: "Status" },
  { key: "action", header: "Action" },
];

const OverView = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
        {cardData.map((card, index) => (
          <CustomCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            dollar={card.dollar}
            className="hover:shadow-md transition-shadow"
          />
        ))}
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <CustomTable
          title="User List"
          columns={userTableColumns}
          data={userTableData}
          searchable={true}
          filterable={true}
          className="mt-8"
        />
      </div>
    </div>
  );
};

export default OverView;
