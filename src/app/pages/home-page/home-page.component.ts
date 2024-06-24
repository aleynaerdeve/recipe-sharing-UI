
import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateRecipeFormComponent } from '../create-recipe-form/create-recipe-form.component';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  recipes: any[] = [];

  constructor(
    private recipeService: RecipeServiceService,
    public dialog: MatDialog,
    public authService: AuthServiceService
  ) {}

  handleopenCreateRecipeForm() {
    this.dialog.open(CreateRecipeFormComponent);
  }

  ngOnInit() {
    this.authService.getUserProfile();
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        console.log('Fetched recipes:', data); // Debug: Verileri kontrol edin
        this.recipes = data;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      }
    });

    this.recipeService.recipeSubject.subscribe({
      next: (state) => {
        this.recipes = state.recipes;
      }
    });
  }

  trackByFn(index: number, item: any) {
    return item.id; // Veya item.id gibi benzersiz bir özellik
  }
}
