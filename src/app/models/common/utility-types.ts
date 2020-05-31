export type valueof<T> = T[keyof T];
export type ExcludePropsByType<T, U> = valueof<
	{
		[P in keyof T]: T[P] extends U ? never : P;
	}
>;

export type OmitByPropType<T, U> = Pick<T, ExcludePropsByType<T, U>>;
