import { Component, output, inject, signal, computed } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutForm } from '../../components/workout-form/workout-form';
import { WorkoutList } from '../../components/workout-list/workout-list';
import { Workout } from '../../models/workout.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-workouts',
  imports: [WorkoutForm, WorkoutList],
  templateUrl: './workouts.html',
  styleUrl: './workouts.scss',
})
export class Workouts {
	
	private workoutService = inject(WorkoutService);
	selectedGroup = signal<string | null>(null);
	readonly workouts = this.workoutService.workouts;
	readonly selectedWorkout = signal<Workout | null>(null);
	
	onFilterChange(event: Event) {
		const value = (event.target as HTMLSelectElement).value;
		this.selectedGroup.set(value || null);
	}
	
	filteredWorkouts = computed(() => {
		const group = this.selectedGroup();
		const workouts = this.workouts();
		
		if(!group) return workouts;
		
		return workouts.filter(w => w.muscleGroup === group);
	});
	
	addTestWorkout() {
		this.workoutService.addWorkout({
			name: 'Puppet Regime Schiena',
			muscleGroup: 'Schiena',
			sets: 3,
			reps: 10
		});
	}
	
	saveWorkout(workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): void {
	  const selected = this.selectedWorkout();

	  if (selected) {
		this.workoutService.updateWorkout(selected.id, workout);
		this.selectedWorkout.set(null);
		return;
	  }

	  this.workoutService.addWorkout(workout);
	}
	
	edit(workout: Workout): void {
	  this.selectedWorkout.set(workout);
	}

	cancelEdit(): void {
	  this.selectedWorkout.set(null);
	}
	
	delete (id: string) {
		this.workoutService.deleteWorkout(id);
	}
	
	
	
	
}
