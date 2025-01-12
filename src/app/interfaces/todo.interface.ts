export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
