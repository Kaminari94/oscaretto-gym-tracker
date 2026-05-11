import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Workouts } from './pages/workouts/workouts';
import { About } from './pages/about/about';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Oscaretto Gym Tracker'
  },
  {
    path: 'workouts',
    component: Workouts,
    title: 'Workouts | Oscaretto Gym Tracker'
  },
  {
    path: 'about',
    component: About,
    title: 'About | Oscaretto Gym Tracker'
  },
  {
    path: '**',
    redirectTo: ''
  }
];