import { useState } from "react";

const EventDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="mb-2">
      <p className="text-gray-600">
        {isExpanded ? description : `${description.slice(0, 100)}...`}
      </p>
      {description.length > 100 && (
        <button
          onClick={toggleReadMore}
          className="text-indigo-500 hover:underline hover:text-indigo-600"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default EventDescription;
