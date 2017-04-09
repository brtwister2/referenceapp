import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchcompanies',
})
export class SearchCompanies implements PipeTransform {

  transform(list: any[], searchTerm: string): any[] {
    if (searchTerm) {
      searchTerm = searchTerm.toUpperCase();
      return list.filter(item => {
        return item.name.toUpperCase().indexOf(searchTerm) !== -1
      });
    } else {
      return list;
    }
  }
}


@Pipe({
  name: 'searchusers',
})
export class SearchUsers implements PipeTransform {

  transform(list: any[], searchTerm: string): any[] {
    if (searchTerm) {
      searchTerm = searchTerm.toUpperCase();
      return list.filter(item => {
        return item.name.toUpperCase().indexOf(searchTerm) !== -1
      });
    } else {
      return list;
    }
  }
}
