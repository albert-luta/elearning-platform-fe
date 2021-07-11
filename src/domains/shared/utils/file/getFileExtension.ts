import { getFileNameFromUrl } from './getFileNameFromUrl';

export const getFileExtension = (file: File | string): string => {
	const name = file instanceof File ? file.name : getFileNameFromUrl(file);
	return ('.' + name.split('.').pop() ?? '(no extension)').toLowerCase();
};
