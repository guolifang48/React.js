import React from 'react';
import { Timeline } from '../../../components';
import { mockTimeline } from '../../../utils/mock';

const TimelinePage = () => (
  <Timeline
    title='Period ending 2017'
    timeline={mockTimeline}
  />
);

export default TimelinePage;