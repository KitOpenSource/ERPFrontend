import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preorder',
  templateUrl: './preorder.component.html',
  styleUrls: ['./preorder.component.css']
})
export class PreorderComponent implements OnInit {

  selectedIndex: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
