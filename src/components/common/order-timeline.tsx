'use client';

import {
  orderStatuses,
  orderStatusTransitions,
} from '@/lib/common/order-status';
import { cn } from '@/lib/utils';
import { ITimelineStep } from '@/types/common';
import { format } from 'date-fns';
import { CalendarClockIcon, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardTitle } from '../ui/card';

interface IProps {
  timeline: ITimelineStep[];
}

export default function OrderTimeline({ timeline }: IProps) {
  const lastStep = timeline?.[timeline?.length - 1];
  const hasNextStep =
    orderStatusTransitions[
      lastStep?.status as keyof typeof orderStatusTransitions
    ]?.length > 0
      ? true
      : false;
  const nextStep: ITimelineStep =
    lastStep && hasNextStep
      ? {
          status:
            'Will be ' +
            (
              orderStatusTransitions[
                lastStep?.status as keyof typeof orderStatusTransitions
              ] || []
            )?.join(' or '),
          date_time: undefined as unknown as string,
        }
      : {
          status: orderStatuses?.[0],
          date_time: undefined as unknown as string,
        };

  const finalTimeLine: ITimelineStep[] = [
    ...(Array.isArray(timeline)
      ? timeline.map((item) => ({ ...(item || {}), completed: true }))
      : []),
    ...(hasNextStep ? [nextStep] : []),
  ];

  return (
    <Card className="!p-0">
      <CardContent className="!p-6">
        <CardTitle className="mb-6">Order Timeline</CardTitle>
        <ol className="relative border-s space-y-5 ms-3">
          {finalTimeLine.map((step, idx) => (
            <li key={idx} className="ms-6">
              <span
                className={cn(
                  'absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-background',
                  step?.completed
                    ? 'bg-primary text-white'
                    : 'bg-primary/40 text-muted-foreground'
                )}
              >
                {step?.completed ? (
                  <CheckCircle2 className="size-6" />
                ) : (
                  <CalendarClockIcon className="size-4 text-gray-200" />
                )}
              </span>

              <h3
                className={cn(
                  'mb-1 text-base font-semibold text-foreground flex items-center',
                  step?.completed ? '' : 'text-gray-400'
                )}
              >
                {step?.status}
              </h3>

              <p
                className={cn(
                  'block mb-2 text-sm text-muted-foreground',
                  step?.date_time ? '' : 'text-gray-400'
                )}
              >
                {step?.date_time
                  ? format(new Date(step?.date_time), 'dd-MMM-yyyy, hh:mm a')
                  : 'Waiting for action...'}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
