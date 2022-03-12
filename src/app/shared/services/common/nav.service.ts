import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	perfil?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		// {
		// 	path: '/admin/upload', title: 'Dashboard', icon: 'home', type: 'link'
		// },
		// {
		// 	title: 'Ecommerce', icon: 'shopping-bag', type: 'sub', active: false, children: [
		// 		{ path: '/ecommerce/products', title: 'Product', type: 'link' },
		// 		{ path: '/ecommerce/product-details/1', title: 'Product page', type: 'link' },
		// 		{ path: '/ecommerce/product/list', title: 'Product list', type: 'link' },
		// 		{ path: '/ecommerce/payment/detail', title: 'Payment Details', type: 'link' },
		// 		{ path: '/ecommerce/order', title: 'Order History', type: 'link' }
		// 	]
		// },
		// {
		// 	path: '/admin/sample', title: 'Sample page', icon: 'file', type: 'link'
		// },
		{
			path: '/admin/responsable-recojo', title: 'Responsable de Recojo', icon: 'user-check', type: 'link', perfil: '5'
		},
		{
			path: '/admin/usuario', title: 'Usuario', icon: 'user', type: 'link', perfil: '1'
		},
		{
			path: '/admin/autorizaciones', title: 'Autorizaciones', icon: 'user-check', type: 'link', perfil: '1'
		},
		{
			path: '/admin/recojos', title: 'Recojos', icon: 'truck', type: 'link', perfil: '1'
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
