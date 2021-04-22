import { FileType } from './FileType';
import { FileTypeExtensions } from './FileTypeExtensions';

// This should be generated from FileTypeExtensions at compile time
export const FileExtensionsType: Record<string, FileType> = Object.entries(
	FileTypeExtensions
).reduce((typeAcc, [type, extensions]) => {
	return {
		...typeAcc,
		...Object.entries(extensions).reduce(
			(acc, [ext]) => ({ ...acc, [ext]: type }),
			{}
		)
	};
}, {});
