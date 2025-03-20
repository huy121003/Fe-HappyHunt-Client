import React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface TimeAgoProps {
  date: string | Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  return (
    <p className="text-xs text-gray-400">
      <i className="far fa-clock mr-1"></i>
      {dayjs(date).fromNow()}
    </p>
  );
};

export default TimeAgo;
