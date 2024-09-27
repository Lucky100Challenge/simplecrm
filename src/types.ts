export interface Task {
  id: number;
  title: string;
  completed: boolean;
  recurring: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  lastCompleted: string | null;
}