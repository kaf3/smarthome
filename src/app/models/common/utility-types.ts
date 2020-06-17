export type valueof<T> = T[keyof T];
export type ExcludePropsByType<T, U> = valueof<
	{
		[P in keyof T]: T[P] extends U ? never : P;
	}
>;

export type ExtractPropsByType<T, U> = valueof<
	{
		[P in keyof T]: T[P] extends U ? P : never;
	}
>;

export type OmitByPropType<T, U> = Pick<T, ExcludePropsByType<T, U>>;
export type PickByPropType<T, U> = Pick<T, ExtractPropsByType<T, U>>;
