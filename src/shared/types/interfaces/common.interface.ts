import { LucideIcon } from "lucide-react";

export interface ApiResponse<T> {
  status: string;
  data: T[];
}

export interface Link{
  name: string;
  href: string;
  isActive: boolean;
  icon: LucideIcon
}

export interface Task {
  id: number;
  categoryId: number;
  title: string;
  isCompleted: boolean;
}

export interface PomoSession {
  target: Task | null;
  duration: number; // in seconds
  remainingTime?: number; // in seconds
  breakDuration: number; // in seconds
  pausedAt: Date[] | null;
  resumedAt: Date[] | null;
  isPaused: boolean;
  isStarted: boolean;
  isCompleted: boolean;
  startedAt: Date | null;
  endedAt: Date | null;
}


export interface Category{
  id: number;
  name: string;
}

export interface Setting{
  darkmode: boolean;
  defaultCyclesNumber: number;
  defaultFocusDuration: number;
  defaultBreakDuration: number;
  defaultLongBreakDuration: number;
}