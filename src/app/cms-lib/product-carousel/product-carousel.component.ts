import { Component, Input } from '@angular/core';
import { AbstractProductComponent } from '../../cms/abstract-product-component';

@Component({
    selector: 'y-product-carousel',
    templateUrl: './product-carousel.component.html',
    styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent extends AbstractProductComponent {
    products = [];
    pause: boolean;

    @Input() productCodes: Array<String>;
    @Input() animate = true;

    protected fetchData() {
        const codes = this.getProductCodes();
        
        if (this.contextParameters && this.contextParameters.hasOwnProperty('animate')) {
            this.animate = this.contextParameters.animate;
        }

        if (codes && codes.length > 0) {
            const query = codes.map(o => o).join(' ');
            // TODO: limit data
            this.productSearch.searchProducts(query).subscribe((results) => {
                this.products = results.products;
                this.cd.markForCheck();
            });
        }
    }

    getProductCodes(): Array<String> {
        let codes;
        if (this.model && this.model.productCodes) {
            codes = this.model.productCodes;
        }else {
            codes = this.productCodes;
        }
        return codes;
    }

    // loadNext() {
    //     console.log('load next');
    //     console.log(this.productPanel);
    // }

    stop() {
        this.pause = true;
    }
    continue() {
        this.pause = false;
    }
}