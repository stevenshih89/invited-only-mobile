interface IHintStep {
  title: string;
  description: string;
}
const hostHintSteps: IHintStep[] = [
  {
    title: 'Select Your Guests',
    description: 'Decide how many guests you’d like to invite. It’s quick and easy to customize your guest list!',
  },
  {
    title: 'Select Number of Guests',
    description:
      'To invite guests, click the + button to increase the number of women or men you would like to invite. Click the - button to decrease the number as needed.',
  },
  {
    title: 'Set Up Your Table or Event',
    description: 'Add event details, upload photos, and give your event a name (optional) to complete the setup.',
  },
  {
    title: 'Select Table / Event type',
    description: 'Select the type of event or table you’d like to create.',
  },
  {
    title: 'Fill in Additional Event Details',
    description: 'Complete the remaining event information such as event name, event photos, and any other relevant details.',
  },
  {
    title: 'Preview Your Event',
    description: 'Take a moment to review all the details of your event.',
  },
  {
    title: 'Your Event is Ready!',
    description: "On this page, your event will be added. Start swiping through guests and invite those you'd like to join you.",
  },
  {
    title: 'View Guest Requests',
    description: 'Here, view all guest requests for your event here.',
  },
];

export {
  hostHintSteps
}
