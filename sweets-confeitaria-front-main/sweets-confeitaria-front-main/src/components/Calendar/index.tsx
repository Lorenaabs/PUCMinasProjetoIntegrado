'use client'

import { DateCalendar } from '@mui/x-date-pickers'

import { DateAdapter } from '@/components/DateAdpter'
import { colors } from '@/styles/colors'
import { transformDayOfWeek } from '@/utils/transformDayOfWeek'

export function Calendar() {
  return (
    <DateAdapter>
      <DateCalendar
        sx={{ backgroundColor: colors.c4.hex(), borderRadius: '1rem' }}
        showDaysOutsideCurrentMonth
        views={['day']}
        readOnly
        dayOfWeekFormatter={(day) => transformDayOfWeek(day)}
        slotProps={{
          calendarHeader: {
            sx: {
              textTransform: 'capitalize',
            },
          },
          leftArrowIcon: {
            sx: {
              backgroundColor: colors.c11.hex(),
              borderRadius: '100%',
            },
          },
          rightArrowIcon: {
            sx: {
              backgroundColor: colors.c11.hex(),
              borderRadius: '100%',
            },
          },
          day: { sx: { fontWeight: 700 } },
        }}
      />
    </DateAdapter>
  )
}
