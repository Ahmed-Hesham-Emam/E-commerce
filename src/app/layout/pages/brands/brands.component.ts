import { brands, DATA } from './../../../shared/interfaces/brands';
import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  brandsList!: DATA[];

  rtl: boolean = false;

  constructor(private _BrandsService: BrandsService) {}

  ngOnInit(): void {
    this.getAllBrands(this.currentPage);

    if (document.dir === 'rtl') {
      this.rtl = true;
    } else {
      this.rtl = false;
    }
  }

  getAllBrands(page: number) {
    this.brandsList = [];
    this._BrandsService.getAllBrands(page).subscribe((data) => {
      // this.brandsList = data.data;
      // console.log(data.data);
      this.brandsList = [...this.brandsList, ...data.data];

      this.totalPages = data.metadata.numberOfPages;
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    });
  }

  //  pagination
  loadPage(page: number) {
    this.currentPage = page;
    this.getAllBrands(this.currentPage);
  }

  loadNextPage() {
    if (this.currentPage <= this.totalPages) {
      this.currentPage += 1;
      this.getAllBrands(this.currentPage);
      // console.log(this.currentPage);
    }
  }

  loadPrevPage() {
    if (this.currentPage >= this.totalPages) {
      this.currentPage -= 1;
      this.getAllBrands(this.currentPage);
    }
  }
}
