import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MuscleGroup, Workout } from '../../models/workout.model';

type WorkoutFormValue = Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>;

@Component({
  selector: 'app-workout-form',
  imports: [ReactiveFormsModule],
  templateUrl: './workout-form.html',
  styleUrl: './workout-form.scss',
})
export class WorkoutForm {
	readonly workoutToEdit = input<Workout | null>(null);
	
	readonly workoutSaved = output<WorkoutFormValue>();
	readonly editCancelled = output<void>();
	
	readonly muscleGroups: MuscleGroup[] = [
		'Petto',
		'Schiena',
		'Gambe',
		'Spalle',
		'Braccia',
		'Core',
		'Altro'
	];
	
	readonly form = new FormGroup({
		name: new FormControl('', {
			nonNullable:true,
			validators: [Validators.required, Validators.minLength(2)]
		}),
		muscleGroup: new FormControl<MuscleGroup>('Petto', {
			nonNullable:true,
			validators: [Validators.required]
		}),
		sets: new FormControl(3, {
		  nonNullable: true,
		  validators: [Validators.required, Validators.min(1)]
		}),
		reps: new FormControl(10, {
			nonNullable: true,
			validators: [Validators.required, Validators.min(1)]
		})
	});
	
	constructor() {
	  effect(() => {
		const workout = this.workoutToEdit();

		if (!workout) {
		  return;
		}

		this.form.patchValue({
		  name: workout.name,
		  muscleGroup: workout.muscleGroup,
		  sets: workout.sets,
		  reps: workout.reps
		});
	  });
	}
	submit(): void {
	  if (this.form.invalid) {
		this.form.markAllAsTouched();
		return;
	  }

	  this.workoutSaved.emit(this.form.getRawValue());

	  this.form.reset({
		name: '',
		muscleGroup: 'Petto',
		sets: 3,
		reps: 10
	  });
	}
	cancel(): void {
	  this.form.reset({
		name: '',
		muscleGroup: 'Petto',
		sets: 3,
		reps: 10
	  });

	  this.editCancelled.emit();
	}
}
