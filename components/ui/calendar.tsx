"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { addMonths, startOfToday } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  disabled,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={disabled}
      className={cn("p-4 select-none w-full flex justify-center", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

export default function TwoCalendars() {
  const today = startOfToday(); // Today's date at midnight
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [nextMonth, setNextMonth] = React.useState(addMonths(new Date(), 1));

  // Handle navigation for the first calendar
  const handleCurrentMonthChange = (month: Date) => {
    setCurrentMonth(month);
    setNextMonth(addMonths(month, 1)); // Keep the second calendar in sync
  };

  // Handle navigation for the second calendar
  const handleNextMonthChange = (month: Date) => {
    setNextMonth(month);
    setCurrentMonth(addMonths(month, -1)); // Keep the first calendar in sync
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
      {/* Current Month Calendar */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-lg font-semibold mb-2">Current Month</h2>
        <Calendar
          month={currentMonth}
          onMonthChange={handleCurrentMonthChange}
          disabled={[{ before: today }]}
        />
      </div>

      {/* Next Month Calendar */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-lg font-semibold mb-2">Next Month</h2>
        <Calendar
          month={nextMonth}
          onMonthChange={handleNextMonthChange}
        />
      </div>
    </div>
  );
}