import { Component, input, output } from '@angular/core';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  imports: [],
  templateUrl: './workout-list.html',
  styleUrl: './workout-list.scss'
})
export class WorkoutList {
  readonly workouts = input.required<Workout[]>();

  readonly editClicked = output<Workout>();
  readonly deleteClicked = output<string>();

  edit(workout: Workout): void {
    this.editClicked.emit(workout);
  }

  delete(id: string): void {
    this.deleteClicked.emit(id);
  }
}