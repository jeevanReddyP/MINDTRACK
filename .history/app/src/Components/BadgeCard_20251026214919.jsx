import React from 'react';

const BadgeCard = ({ badges }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center transition-opacity duration-300 ${
              badge.earned ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 text-2xl ${
                badge.earned ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-500'
              }`}
            >
              {badge.earned ? badge.icon : '🔒'}
            </div>
            <span className="text-xs">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCard;
