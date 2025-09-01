/** @format */

import React from "react";
import CustomCard from "@/components/common/custom-card";
import CustomTable from "@/components/common/custom-table";

import { userTableData } from "@/redux/data";

const cardData = [
  {
    title: "Total Payment",
    value: "25,256",
  },
  {
    title: "Paid Payment",
    value: "5,256",
  },
  {
    title: "Cancelled Payment",
    value: "456",
  },
];

// Table configuration for payment page
const paymentTableColumns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "userType", header: "User Type" },
  { key: "email", header: "Email" },
  { key: "status", header: "Status" },
  { key: "amount", header: "Amount" },
];

const PaymentPage = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <CustomCard
            key={index}
            title={card.title}
            value={card.value}
            showIcon={false}
            className="hover:shadow-md transition-shadow"
          />
        ))}
      </div>

      {/* Payment Table */}
      <div>
        <CustomTable
          title="User List"
          columns={paymentTableColumns}
          data={userTableData}
          searchable={true}
          filterable={true}
        />
      </div>

      {/* Total Amount Section */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
        <span className="text-lg font-semibold text-gray-900">
          Total Amount
        </span>
        <span className="text-xl font-bold text-gray-900">$12,534</span>
      </div>
    </div>
  );
};

export default PaymentPage;
