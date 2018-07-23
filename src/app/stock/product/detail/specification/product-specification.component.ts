import { Component, OnInit, Input } from '@angular/core';
import { ProductAttribute } from '../../classes/product-attribute';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductAttributeService } from '../../services/product-attribute.service';
import { AttributeType } from '../../../category/classes/attribute-type.enum';

@Component({
    selector: 'product-specification',
    templateUrl: './product-specification.component.html'
})
export class ProductSpecificationComponent implements OnInit {
    @Input() productId: number;

    attributes: ProductAttribute[];
    attributeForm: FormGroup;
    attributeType = AttributeType;
    constructor(private attributeService: ProductAttributeService, private fb: FormBuilder) {}

    ngOnInit() {
        this.attributeService.get(this.productId).subscribe(attributes => {
            this.attributes = attributes;
            this.createForm();
        });
    }

    private createForm(): void {
        const group: any = {};
        for (let i = 0; i < this.attributes.length; i++) {
            for (let j = 0; j < this.attributes[i].childAttributes.length; j++) {
                group[
                    this.attributes[i].attributeName +
                        this.attributes[i].childAttributes[j].attributeName
                ] = new FormControl(this.attributes[i].childAttributes[j].attributeValue);
            }
        }
        this.attributeForm = new FormGroup(group);
    }

    private updateModel(): void {
        const formModel = this.attributeForm.getRawValue();

        for (let i = 0; i < this.attributes.length; i++) {
            for (let j = 0; j < this.attributes[i].childAttributes.length; j++) {
                this.attributes[i].childAttributes[j].attributeValue =
                    formModel[this.attributes[i].childAttributes[j].attributeValue];
            }
        }
    }

    submit(): void {
        this.updateModel();
        this.attributeService.insert(this.productId, this.attributes).then(attributes => {
            this.attributes = attributes;
        });
    }
}
