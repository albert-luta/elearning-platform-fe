export const getFileExtension = (file: File): string => {
	return ('.' + file.name.split('.').pop() ?? '(no extension)').toLowerCase();
};
