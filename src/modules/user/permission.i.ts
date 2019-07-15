import { Permission as PermissionModel } from '../../model/entity/permission.model';
import { Permission } from './permission';

export interface PermissionInterface {
    readonly model: PermissionModel;
    name: string;
    save(): any;
    findOne(): any;
    find(): any;
    findSelect(select: string[]): Permission;
    findWhere(where: PermissionObject | number): Permission;
    findOrder(order: FindOrderInterface): Permission;
    findPagination(skip: number, take: number): Permission;
    updateWhere(where: PermissionObject | number): Permission;
    updateTo(toUpdate: PermissionObject): Permission;
    update(): any;
}

export interface PermissionObject {
    id?: number | undefined;
    name?: string | undefined;
}

export interface WhereInterface {
	where: PermissionObject | number;
}

export interface SelectInterface {
	select: string[];
}

export interface FindOneQuerryInterface {
    where: PermissionObject | number;
    select: string[];
}

export interface FindQuerryInterface {
    order: OrderInterface;
    select: string[];
}

export interface FindOrderInterface {
    name?: ["ASC", "DESC"];
    id?: ["ASC", "DESC"];
}

export interface OrderInterface extends PaginationInterface {
    order: FindOrderInterface;
}

export interface PaginationInterface {
    skip: number;
    take: number;
}