import React from "react";

export const ResumeJob = ({
  role,
  company,
  timeline,
  location,
  team,
}: {
  role: string;
  company: string;
  timeline: string;
  location?: string;
  team?: string;
}) => {
  return (
    <div className="w-full mt-6 mb-2">
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
        <div className="font-bold text-gray-900 dark:text-gray-100 text-lg w-full sm:w-[52%] text-left">
          {role}
        </div>
        <div className="font-bold text-gray-900 dark:text-gray-100 w-full sm:w-[18%] text-left sm:text-center">
          {company}
        </div>
        <div className="font-bold text-gray-900 dark:text-gray-100 w-full sm:w-[30%] text-left sm:text-right whitespace-nowrap">
          {timeline}
        </div>
      </div>
      {(team || location) && (
        <div className="flex flex-col sm:flex-row justify-between items-baseline text-sm text-gray-700 dark:text-gray-300">
          <div className="w-full sm:w-[52%] text-left">{team}</div>
          <div className="w-full sm:w-[18%] text-left sm:text-center"></div>
          <div className="w-full sm:w-[30%] text-left sm:text-right">{location}</div>
        </div>
      )}
    </div>
  );
};
