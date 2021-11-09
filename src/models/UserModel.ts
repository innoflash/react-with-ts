import { NamedModel } from './NamedModel';

export interface UserModel extends NamedModel {
	email: string;
	phone: string;
}