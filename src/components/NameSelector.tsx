import { type ScheduleEntry } from '@/utils/processSchedule';
import { textStyle } from '@ryanliu6/xi/styles';

interface NameSelectorProps {
  scheduleData: ScheduleEntry[];
  selectedName: string | null;
  onNameSelect: (name: string | null) => void;
}

const NameSelector = ({ scheduleData, selectedName, onNameSelect }: NameSelectorProps) => {
  // Get unique names from schedule
  const names = [...new Set(scheduleData.map((entry) => entry.name))].sort();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name-select" className={textStyle}>
        Select your name:
      </label>
      <select
        id="name-select"
        value={selectedName || ''}
        onChange={(e) => onNameSelect(e.target.value || null)}
        className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
      >
        <option value="">All Names</option>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NameSelector;
