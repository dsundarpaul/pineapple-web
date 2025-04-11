import { DateTimePicker } from "@/components/ui/date-time-picker";
import { useState } from "react";

type RangeDatePickerProps = {
  defatulStartDate?: Date;
  defaultEndDate?: Date;
};

const RangeDatePicker = ({ defatulStartDate, defaultEndDate }: RangeDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>(defatulStartDate || new Date());
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate || null);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    if(endDate === null) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  }

  return (
    <>
      <div className='flex gap-3 w-full'>
        <DateTimePicker defaultDate={startDate} onDateChange={(value) => handleStartDateChange(value)} />
        <DateTimePicker defaultDate={endDate} onDateChange={(value) => handleEndDateChange(value)} disabledDateBefore={startDate} />
      </div>
    </>
  );
};

export default RangeDatePicker;
