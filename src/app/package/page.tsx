/** @format */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus, X } from "lucide-react";
import React, { useState } from "react";

const PackagePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [packageData, setPackageData] = useState({
    title: "Life Time Member",
    basePrice: 10,
    features: [
      "Tailored AI Match Suggestions",
      "Longer Subscription Options",
      "In-Depth Match Progress Insights",
      "Elite Dating Plans",
      "Insider Dating Advice",
    ],
    actionButton: "Buy Now",
    discountEnabled: true,
    discountPrice: 7,
  });

  const [editData, setEditData] = useState(packageData);

  const handleSave = () => {
    setPackageData(editData);
    setIsOpen(false);
  };

  const addFeature = () => {
    setEditData({
      ...editData,
      features: [...editData.features, ""],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...editData.features];
    newFeatures[index] = value;
    setEditData({
      ...editData,
      features: newFeatures,
    });
  };

  const removeFeature = (index: number): void => {
    const newFeatures: string[] = editData.features.filter(
      (_, i) => i !== index
    );
    setEditData({
      ...editData,
      features: newFeatures,
    });
  };

  const currentPrice = packageData.discountEnabled
    ? packageData.discountPrice
    : packageData.basePrice;

  return (
    <div className="flex justify-center bg-gray-100 p-4">
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
                {packageData.title}
              </span>
            </div>
            <div className="justify-end">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-white text-primary hover:bg-white/10 right-0"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl md:text-2xl font-bold">
                      Edit Package
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-2 mt-0">
                    {/* Title and Base Price */}
                    <div className="flex ">
                      <div className="flex-1">
                        <label className="block text-sm md:text-base font-medium mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Package title"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-sm md:text-base font-medium mb-2">
                          Based Price
                        </label>
                        <input
                          type="number"
                          value={editData.basePrice}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              basePrice: Number(e.target.value),
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="10"
                        />
                      </div>
                    </div>

                    {/* Features List */}
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-2">
                        Features List
                      </label>
                      <div className="space-y-2">
                        {editData.features.map((feature, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) =>
                                updateFeature(index, e.target.value)
                              }
                              className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Feature description"
                            />
                            {editData.features.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFeature(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={addFeature}
                          className="w-full border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-600 hover:text-purple-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add more
                        </Button>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      <label className="block text-sm md:text-base font-medium mb-2">
                        Action Button
                      </label>
                      <input
                        type="text"
                        value={editData.actionButton}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            actionButton: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Button text"
                      />
                    </div>

                    {/* Discount Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm md:text-base font-medium">
                          Discount
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm md:text-base text-gray-600">
                            {editData.discountEnabled ? "ON" : "OFF"}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setEditData({
                                ...editData,
                                discountEnabled: !editData.discountEnabled,
                              })
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              editData.discountEnabled
                                ? "bg-purple-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                editData.discountEnabled
                                  ? "translate-x-7"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {editData.discountEnabled && (
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">
                              Based Price
                            </label>
                            <input
                              type="number"
                              value={editData.basePrice}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  basePrice: Number(e.target.value),
                                })
                              }
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg bg-gray-50"
                              readOnly
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">
                              After Discount Price
                            </label>
                            <input
                              type="number"
                              value={editData.discountPrice}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  discountPrice: Number(e.target.value),
                                })
                              }
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Discounted price"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={handleSave}
                        className="bg-black text-white hover:bg-gray-800 px-8 py-2 rounded-lg font-medium"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Buy Button */}
          <div className="flex flex-col justify-center mx-auto items-center">
            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">${currentPrice}</span>
                {packageData.discountEnabled && (
                  <span className="text-2xl line-through opacity-70">
                    ${packageData.basePrice}
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {packageData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-white text-[#9604b6] hover:bg-white/90 px-8 py-2 rounded-xl font-medium mb-3">
              {packageData.actionButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagePage;
