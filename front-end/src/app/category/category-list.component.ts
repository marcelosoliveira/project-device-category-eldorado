import { Component, OnInit } from "@angular/core";
import { Category } from "./category";
import { CategoryService } from "./category.service";

@Component({
    // selector: 'app-category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

    public category: Category[] = [];

    constructor(private categoryService: CategoryService) {};

    ngOnInit(): void {
        this.retrieveAll();
    }

    public retrieveAll(): void {
        this.categoryService.retrieveAll().subscribe({
            next: category => { 
                this.category = category;  
            },
            error: ({ error }) => console.log(`${error}`),
        });
    }

    public delete(id: number) {
        if (confirm("Tem certeza que deseja deletar categoria?").valueOf()) {
            this.categoryService.deleteById(id).subscribe({
                next: () => {
                    this.retrieveAll();
                },
                error: ({ error }) => console.log(`${error}`),
            });
        }
    }

}