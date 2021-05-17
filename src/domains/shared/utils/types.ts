/**
 * Pick what fields to become required
 */
export type RequiredFields<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

/**
 * Pick what fields to become optional
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;
