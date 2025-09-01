/** @format */

import React from "react";
import CustomCard from "@/components/common/custom-card";
import CustomTable from "@/components/common/custom-table";

import { userTableData } from "@/redux/data";

const cardData = [
  {
    title: "Total",
    value: "25,256",
    growth: { percentage: 20, period: "this month" },
  },
  {
    title: "Paid Users",
    value: "5,256",
    growth: { percentage: 20, period: "this month" },
  },
  {
    title: "Free Users",
    value: "456",
    growth: { percentage: 20, period: "this month" },
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

const UserList = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <CustomCard
            key={index}
            title={card.title}
            value={card.value}
            growth={card.growth}
            showIcon={false}
            className="hover:shadow-md transition-shadow"
          />
        ))}
      </div>

      {/* User Table */}
      <div>
        <CustomTable
          title="User List"
          columns={userTableColumns}
          data={userTableData}
          searchable={true}
          filterable={true}
        />
      </div>
    </div>
  );
};

export default UserList;
