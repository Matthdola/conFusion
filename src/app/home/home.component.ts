import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../share/dish';
import { Promotion } from '../share/promotion';
import { Leader } from '../share/leader';

import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    //this.dish = this.dishService.getFeaturedDish();
    this.dishService.getFeaturedDish()
    .subscribe((dish) => this.dish = dish,
      errmess => this.dishErrMess = errmess as any);

    //this.promotion = this.promotionService.getFeaturedDish();
    this.promotionService.getFeaturedDish()
    .subscribe((promotion) => this.promotion = promotion );
    //this.leader = this.leaderService.getFeaturedLeader();
    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader);
  }

}
