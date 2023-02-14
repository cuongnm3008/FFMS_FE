// import { Directive, ElementRef, EventEmitter, HostListener, Input, NgModule, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
// import KTApp from 'src/assets/metronic/js/app.js';
// import { AppUtilityService } from '../services/app-utility.service';

// @Directive({
// 	selector: '[appTooltip]'
// })
// export class AppTooltipDirective implements OnInit, OnChanges, OnDestroy {

// 	constructor(
// 		private readonly _elRef: ElementRef,
// 		private readonly _renderer: Renderer2
// 	) { }

// 	isOnInit = false;

// 	objTooltip: any;

// 	@Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

// 	@Input() appTooltip: string = "...";

// 	@HostListener('mouseleave', ['$event'])
// 	onLeave(e: MouseEvent) {
// 		if (this.objTooltip) this.objTooltip.hide();
// 	}

// 	ngOnChanges(changes: SimpleChanges): void {
// 		let _title = changes['appTooltip'];
// 		if (this.isOnInit && _title && _title.isFirstChange) {
// 			this._renderer.setAttribute(this._elRef.nativeElement, 'title', '<span class="fw-bolder">' + _title.currentValue + '</span>');
// 			setTimeout(() => {
// 				if (this.objTooltip) this.objTooltip.hide();
// 				this.objTooltip = KTApp.initBootstrapTooltip(this._elRef.nativeElement, {});
// 			}, 300);
// 		}
// 	}

// 	ngOnInit() {
// 		this.isOnInit = true;
// 		this._renderer.setAttribute(this._elRef.nativeElement, 'data-bs-toggle', 'tooltip');
// 		this._renderer.setAttribute(this._elRef.nativeElement, 'data-bs-html', 'true');
// 		this._renderer.setAttribute(this._elRef.nativeElement, 'data-bs-placement', this.placement);

// 		if (AppUtilityService.isNullOrEmpty(this.appTooltip)) return;
// 		this._renderer.setAttribute(this._elRef.nativeElement, 'title', '<span class="fw-bolder">' + this.appTooltip + '</span>');
// 		this.objTooltip = KTApp.initBootstrapTooltip(this._elRef.nativeElement, {});
// 	}

// 	ngOnDestroy(): void {
// 		if (this.objTooltip) this.objTooltip.hide();
// 	}
// }

// @NgModule({
// 	declarations: [
// 		AppTooltipDirective
// 	],
// 	exports: [
// 		AppTooltipDirective
// 	],
// })
// export class AppTooltipModule { }
