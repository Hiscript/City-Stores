import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../classes/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { DropdownType } from '../../../../classes/dropdown-type.enum';

@Component({
    selector: 'category-overview',
    templateUrl: './category-overview.component.html'
})
export class CategoryOverviewComponent implements OnInit {
    @Input() category: Category;
    @Output() saved: EventEmitter<Category> = new EventEmitter<Category>();

    categoryForm: FormGroup;
    dropdownType;
    constructor(private categoryService: CategoryService, private fb: FormBuilder) {
        this.createForm();
        this.dropdownType = DropdownType;
    }

    ngOnInit() {
        this.categoryForm.patchValue(this.category);
    }

    private createForm(): void {
        this.categoryForm = this.fb.group({
            categoryName: [null, Validators.required],
            categoryTypeId: [null, Validators.required]
        });
    }

    private updateModel(): void {
        const formModel = this.categoryForm.value;
        this.category.categoryName = formModel.categoryName;
        this.category.categoryTypeId = formModel.categoryTypeId;
    }

    submit(): void {
        if (this.categoryForm.valid) {
            this.updateModel();
            if (this.category.categoryId === 0) {
                this.categoryService
                    .insert(this.category)
                    .then(customer => this.saved.emit(customer));
            } else {
                this.categoryService.update(this.category);
            }
        }
    }
}
