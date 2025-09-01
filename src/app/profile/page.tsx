/** @format */
"use client";

import Image from "next/image";
import React from "react";
const admins = [{ name: "Mahdee", role: "Admin (Me)" }];
const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className=" mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Image
              src="/profile-img.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="w-16 h-16 bg-gray-100 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">Mahdee Rashid</h2>
              <p className="text-gray-600">polash@gmail.com</p>
              <p className="text-gray-500">Admin</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold p-4 border-b">Admin List</h3>
          <ul className="divide-y">
            {admins.map((admin, index) => (
              <li key={index} className="p-4 flex justify-between items-center">
                <span className="text-gray-700">{admin.name}</span>
                <span className="text-gray-500">{admin.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
