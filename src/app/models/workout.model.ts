export type MuscleGroup = 
	| 'Petto'
	| 'Schiena'
	| 'Gambe'
	| 'Spalle'
	| 'Braccia'
	| 'Core'
	| 'Altro';
	
export interface Workout {
	id: string;
	name: string;
	muscleGroup: MuscleGroup;
	sets: number;
	reps: number;
	createdAt: string;
	updatedAt: string;
}
