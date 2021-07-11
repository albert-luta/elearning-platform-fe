export const getFileNameFromUrl = (fileUrl: string): string => {
	return decodeURI(fileUrl).split('/').pop() as string;
};
