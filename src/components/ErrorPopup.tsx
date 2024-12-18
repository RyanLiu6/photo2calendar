import { textStyle } from '@ryanliu6/xi/styles';
import { Button } from '@/components/Button';

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup = ({ message, onClose }: ErrorPopupProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Error Processing Schedule</h3>
          <p className={`${textStyle} whitespace-pre-wrap`}>{message}</p>
          <div className="flex justify-between gap-4">
            <Button onClick={() => (window.location.href = '/')}>Upload New Image</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
