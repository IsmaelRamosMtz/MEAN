import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'imagen',
  // Actualiza la imagen cada vez que se cambia
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: any) {

    if(!heroe.id && !heroe.alt_img){
      return `assets/images/no-image.png`;
    } else if( heroe.alt_img ){
      return heroe.alt_img;
    } else{
      return `assets/heroes/${ heroe.id }.jpg`;
    }
  }

}
