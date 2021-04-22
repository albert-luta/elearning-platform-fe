import { FileExtensionsType } from '../../constants/file/FileExtensionsType';
import { FileType } from '../../constants/file/FileType';
import { getFileExtension } from './getFileExtension';

export const getFileType = (file: File): FileType => {
	const ext = getFileExtension(file);

	if (ext in FileExtensionsType) {
		return FileExtensionsType[ext];
	}

	return FileType.UNKNOWN;
};
