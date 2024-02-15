import React from "react";
import { User } from "../(main)/page";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const imageArray = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/400/500",
  "https://picsum.photos/300/400",
  "https://picsum.photos/500/200",
  "https://picsum.photos/600/300",
  "https://picsum.photos/250/350",
  "https://picsum.photos/350/250",
  "https://picsum.photos/450/550",
  "https://picsum.photos/550/450",
  "https://picsum.photos/700/400",
  "https://picsum.photos/400/700",
  "https://picsum.photos/300/600",
  "https://picsum.photos/600/200",
  "https://picsum.photos/250/450",
  "https://picsum.photos/450/250",
  "https://picsum.photos/550/350",
  "https://picsum.photos/350/550",
  "https://picsum.photos/700/300",
  "https://picsum.photos/300/700",
];

const getBackgroundColor = (hairColor: string): string => {
  const colorMap: Record<string, string> = {
    none: "white",
    brown: "#8B4513",
    blonde: "#d9b380",
    blond: "#d9b380",
    grey: "#808080",
    auburn: "#9A3001",
    "brown, grey": "#A52A2A",
    black: "#000",
    "n/a": "white",
    "auburn, white": "#FFD700",
  };

  return colorMap[hairColor.toLowerCase()] || "white";
};

const getRandomIndex = (arrayLength: number): number => {
  return Math.floor(Math.random() * arrayLength);
};

const UserCard: React.FC<{ user: User; index: number }> = ({ user, index }) => {
  const randomIndex = getRandomIndex(imageArray.length);
  const cardStyle = {
    backgroundColor: getBackgroundColor(user.hair_color),
  };

  return (
    <Card className="rounded-md shadow-sm" style={cardStyle}>
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={imageArray[randomIndex]}
            alt={`Thumbnail`}
            fill
            className="object-cover rounded-lg"
            sizes="10"
          />
        </div>

        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-xl mb-2">{user.name}</h2>
          <p className="text-gray-700">Hair Color: {user.hair_color}</p>
          <p className="text-gray-700">Skin Color: {user.skin_color}</p>
          <p className="text-gray-700">Gender: {user.gender}</p>
          <p className="text-gray-700">Vehicle Count: {user.vehicles.length}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
