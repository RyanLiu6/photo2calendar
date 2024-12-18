import { textStyle } from '@ryanliu6/xi/styles';

interface ExpiryTimerProps {
  expiryTime: number;
}

const ExpiryTimer = ({ expiryTime }: ExpiryTimerProps) => {
  const expiryDate = new Date(expiryTime);

  // Format: "Expires on March 19, 2024 at 5:30 PM (Your Time)"
  const formattedTime = `Expires on ${expiryDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} at ${expiryDate.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })} (Your Time)`;

  return (
    <div className={`${textStyle} text-sm text-slate-500 dark:text-slate-400`}>{formattedTime}</div>
  );
};

export default ExpiryTimer;
