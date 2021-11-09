export interface SuccessResponseModel<T = unknown> {
	success: boolean;
	message: string;
	data: T;
}