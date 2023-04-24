import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'pma-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  constructor(private auth: AuthserviceService, private router: Router) { }
  config: SwiperOptions = {
    pagination: {
      el: ".pag_bullet",
      clickable: true,
      type: 'bullets',
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
  onStart() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['./auth/main']);
    } else {
      this.router.navigate(['./auth/login']);
    }
  }
}
