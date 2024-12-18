import classNames from 'classnames';
import { textStyle } from '@ryanliu6/xi/styles';

interface ProcessingIndicatorProps {
  stage: 'uploading' | 'processing' | 'extracting' | 'complete';
}

const stages = {
  uploading: 'Uploading image...',
  processing: 'Processing with OCR...',
  extracting: 'Extracting schedule data...',
  complete: 'Complete!',
};

const ProcessingIndicator = ({ stage }: ProcessingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
      <div className="flex flex-col gap-2">
        {Object.entries(stages).map(([key, text]) => (
          <p
            key={key}
            className={classNames('text-sm transition-opacity', textStyle, {
              'opacity-100': stage === key,
              'opacity-50': stage !== key,
            })}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProcessingIndicator;
