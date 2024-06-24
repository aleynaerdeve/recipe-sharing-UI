
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  private baseUrl = 'http://localhost:5454/api';

  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwt");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/recipes`, { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  createRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/recipes`, recipe, { headers }).pipe(
      tap((newRecipe) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes: [newRecipe, ...currentState.recipes] });
      })
    );
  }

  updateRecipe(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/recipes/${recipe.id}`, recipe, { headers }).pipe(
      tap((updatedRecipe: any) => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.map((item: any) =>
          item.id === updatedRecipe.id ? updatedRecipe : item
        );
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
  }

  likeRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/recipes/${id}/like`, {}, { headers }).pipe(
      tap((updatedRecipe: any) => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.map((item: any) =>
          item.id === updatedRecipe.id ? updatedRecipe : item
        );
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/recipes/${id}`, { headers }).pipe(
      tap(() => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.filter((item: any) => item.id !== id);
        this.recipeSubject.next({ ...currentState, recipes: updatedRecipes });
      })
    );
  }
}
