import { FoundTask, PomoSession, Task } from "./common.interface";
import { PomoSessionData } from "./pomodoro.interface";

export interface PomoStore {
  pomoSession: PomoSession;
  setPomoSessionID: (id: number) => void;
  removeTargetTask: () => void,
  setTargetTask: (task : FoundTask) => void;
  updateTotalSessionDuration: () => void;
  updateWastedTime: (newDuration: number) => void;
  updateCurrentFocusDuration: (newDuration: number) => void;
  updateCurrentBreakDuration: (newDuration: number) => void;
  updateTotalFocusDuration: () => void;
  updateTotalBreakDuration: () => void;
  skipCounting: () => void;
  completePomoSession: () => void;
  endBreakDuration: () => void;
  startFocus: () => void;
  endFocus: () => void;
  skipBreakDuration: () => void;
  updateCurrentCycle: () => void;
  resetPomoSession: () => void;
  endFocusSession: () => void;
  setPomoSessionData: (data: PomoSessionData) => void;
  startBreakSession: () => void;
  startPomoSession: () => void;
  pausePomoSession: () => void;
  resumePomoSession: () => void;
  endPomoSession: () => void;
  updateRemainingTime: (remainingTime: number) => void;
}

export interface CheckListStore {
  checklists: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
}

export interface TaskSearchBarStore {
  isSearching: boolean;
  searchTerm: string;
  searchResults: Task[];
  setSearchTerm: (searchTerm: string) => void;
  setIsSearching: (isOpen : boolean) => void;
  handleTaskSelect: (taskId: number) => void;
}
