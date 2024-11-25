type Nullable<T> = { [P in keyof T]: T[P] | null | undefined };

export default Nullable;
