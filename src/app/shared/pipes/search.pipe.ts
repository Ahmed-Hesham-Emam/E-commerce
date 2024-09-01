import { Pipe, PipeTransform } from '@angular/core';
import { allProducts } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(productList: allProducts[], userSearch: string): allProducts[] {
    return productList.filter((product) => {
      return product.title.toLowerCase().includes(userSearch.toLowerCase());
    });
  }
}
