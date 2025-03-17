import React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface TimeAgoProps {
  date: string | Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  return dayjs(date).fromNow();
};

export default TimeAgo;
