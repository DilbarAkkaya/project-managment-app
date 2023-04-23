import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'pma-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  config: SwiperOptions = {
    pagination: {
      el: ".pag_bullet",
        clickable: true,
        type : 'bullets',
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
},
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    slidesPerView: 1,
  };
}
