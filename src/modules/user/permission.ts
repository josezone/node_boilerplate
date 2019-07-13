import { injectable } from 'inversify';
import { ObjectLiteral } from 'typeorm';

import { db } from '../../config/db';
import { Permission as PermissionModel } from '../../model/entity/permission.model';
import {
    FindOneQuerryInterface, FindOrderInterface, OrderInterface, PaginationInterface,
    PermissionInterface, PermissionObject, SelectInterface, WhereInterface
} from './permission.i';

@injectable()
export class Permission implements PermissionInterface {

	private permissionRepository!: ObjectLiteral;
	private permissionData!: PermissionModel;
	private whereFind!: WhereInterface;
	private whereUpdate!: PermissionObject | number;
	private toUpdate!: PermissionObject;
	private selectFind!: SelectInterface;
	private orderFind!: FindOrderInterface;
	private paginationFind!: PaginationInterface;

	init(){
		const connect = db.connect;
		this.permissionData = new PermissionModel();
		this.permissionRepository =  connect.getRepository(this.permissionData);
	}

	set name(name: string) {
		this.permissionData.name = name;
	}

	get model(): PermissionModel {
		return this.permissionData;
	}

	save(): Promise<any> {
		return this.permissionRepository.save(this.permissionData);
	}

	private findOneQuerry(): FindOneQuerryInterface | {}{
		let querry: FindOneQuerryInterface | {} = {};
		if(this.selectFind){
			querry = {...querry, ...this.selectFind};
		}
		if(this.whereFind){
			querry = {...querry, ...this.whereFind};
		}
		return querry;
	}

	private findQuerry(): OrderInterface | {} {
		let querry: OrderInterface | {} = {};
		if(this.orderFind){
			querry = {...querry, ...this.orderFind};
		}
		if(this.paginationFind){
			querry = {...querry, ...this.paginationFind};
		}
		return querry;
	}

	findOne(): Promise<any>{
		const querry = this.findOneQuerry();
		return this.permissionRepository.findOne(querry);
	}

	find(): Promise<any>{
		let querry = this.findOneQuerry();
		querry = {...querry, ...this.findQuerry()};
		return this.permissionRepository.find(querry);
	}

	findSelect(select: string[]): Permission{
		this.selectFind = { select };
		return this;
	}

	findWhere(where: PermissionObject | number): Permission{
		this.whereFind = { where };
		return this;
	}

	findOrder(order: FindOrderInterface): Permission{
		this.orderFind = { ...order };
		return this;
	}

	findPagination(skip: number, take: number): Permission{
		this.paginationFind = { skip, take };
		return this;
	}

	updateWhere(where: PermissionObject | number): Permission{
		if(typeof(where) === 'number'){
			this.whereUpdate = where;
		} else {
			this.whereUpdate = { ...where };
		}
		return this;
	}

	updateTo(toUpdate: PermissionObject): Permission{
		this.toUpdate = { ...toUpdate };
		return this;
	}

	update(): Promise<any>{
		return this.permissionRepository.update(this.whereUpdate, this.toUpdate);
	}
}
