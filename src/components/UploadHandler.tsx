import { type Stage } from './ImageUpload';
import ImageUpload from './ImageUpload';

const UploadHandler = () => {
  const handleUpload = async (file: File, setStage: (stage: Stage) => void) => {
    try {
      console.log('Creating form data...');
      const formData = new FormData();
      formData.append('schedule', file);

      setStage('uploading');
      console.log('Sending request to server...');
      const response = await fetch('/api/process-schedule', {
        method: 'POST',
        body: formData,
      });

      setStage('processing');
      const data = await response.json();

      if (!response.ok) {
        console.error('Server error:', data);
        throw new Error(data.error || 'Failed to process schedule');
      }

      console.log('Processing complete, got scheduleId:', data.scheduleId);
      setStage('extracting');

      setStage('complete');
      // Small delay to show completion state
      await new Promise((resolve) => setTimeout(resolve, 500));

      window.location.href = `/${data.scheduleId}`;
    } catch (error) {
      console.error('Upload error:', error);
      throw error instanceof Error ? error : new Error('Failed to process schedule');
    }
  };

  return <ImageUpload onUpload={handleUpload} />;
};

export default UploadHandler;
