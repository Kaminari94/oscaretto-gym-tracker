import { Injectable, signal } from '@angular/core';
import { Workout } from '../models/workout.model';

@Injectable({
	providedIn: 'root'
})
export class WorkoutService {
	private readonly storageKey = 'oscaretto-gym-tracker-workouts';
	
	private readonly workoutsSignal = signal<Workout[]>(this.loadFromStorage());
	
	readonly workouts = this.workoutsSignal.asReadonly();
	
	addWorkout(workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): void {
		const now = new Date().toISOString();
		
		const newWorkout: Workout = {
			...workout,
			id: crypto.randomUUID(),
			createdAt: now,
			updatedAt: now
	};
	
	this.updateWorkouts([...this.workoutsSignal(), newWorkout]);
}

updateWorkout(id: string, changes: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): void {
	const now = new Date().toISOString();
	
	const updatedWorkouts = this.workoutsSignal().map((workout) =>
		workout.id === id
			? {
				...workout,
				...changes,
				updatedAt: now
			}
		: workout
	);
	
	this.updateWorkouts(updatedWorkouts);
}

deleteWorkout(id: string): void {
	const updatedWorkouts = this.workoutsSignal().filter(
		(workout) => workout.id !== id
	);
	
	this.updateWorkouts(updatedWorkouts);
}

private updateWorkouts(workouts: Workout[]): void {
	this.workoutsSignal.set(workouts);
	localStorage.setItem(this.storageKey, JSON.stringify(workouts));
}

private loadFromStorage(): Workout[] {
	const storedWorkouts = localStorage.getItem(this.storageKey);
	
	if(!storedWorkouts) {
		return [];
	}
	
	try {
		return JSON.parse(storedWorkouts) as Workout[];
	} catch {
		return [];
	}
}
}