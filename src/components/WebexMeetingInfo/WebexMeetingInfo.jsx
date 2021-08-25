import React from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import Spinner from '../generic/Spinner/Spinner';

import webexComponentClasses from '../helpers';
import {useMeeting} from '../hooks';

/**
 * Formats a start and end date to a readable string.
 * Example: "5:00 PM - 6:00 PM"
 *
 * @param {Date} startDate  Meeting start time
 * @param {Date} endDate  Meeting end time
 * @returns {string} Formatted time range
 */
export function formatMeetingTime(startDate, endDate) {
  const formattedStartTime = format(startDate, 'p');
  const formattedEndTime = format(endDate, 'p');

  return `${formattedStartTime} - ${formattedEndTime}`;
}

/**
 * Webex Meeting Info component displays the information associated with
 * a given meetingID.
 *
 * @param {object} props  Data passed to the component
 * @param {string} props.className  Custom CSS class to apply
 * @param {string} props.meetingID  ID of the meeting
 * @param {object} props.style  Custom style to apply
 * @returns {object} JSX of the component
 */
export default function WebexMeetingInfo({className, meetingID, style}) {
  const {
    ID,
    startTime,
    endTime,
    title,
  } = useMeeting(meetingID);
  const cssClasses = webexComponentClasses('meeting-info', className);
  let infoComponent = <Spinner size={36} />;

  if (ID) {
    const displayTitle = title || 'No Meeting Information';

    infoComponent = (
      <>
        <h2>{displayTitle}</h2>
        {
          startTime
          && endTime
          && <h3>{formatMeetingTime(new Date(startTime), new Date(endTime))}</h3>
        }
      </>
    );
  }

  return <div className={cssClasses} style={style}>{infoComponent}</div>;
}

WebexMeetingInfo.propTypes = {
  className: PropTypes.string,
  meetingID: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

WebexMeetingInfo.defaultProps = {
  className: '',
  style: undefined,
};
