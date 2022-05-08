import React from "react";

export const CallDescription: React.FC<{ callDesc: string }> = ({
  callDesc,
}) => {
  return (
    <div className="p-lr-24 p-tb-12 min-wd-40r">
      <span className="ft-sz-20 ft-wt-500">{callDesc}</span>
    </div>
  );
};
