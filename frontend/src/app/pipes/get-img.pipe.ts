import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getImg'
})
export class GetImgPipe implements PipeTransform {

  imgUrl: string = '';


  transform(value: string, colection: string): any {
    this.imgUrl = `http://localhost:3025/api/uploads/${colection}/${value}`

    console.log(this.imgUrl);


    return this.imgUrl;
  }

}
