import { FileSizeUnit } from '../../constants/file/FileSizeUnit';

export const convertToBytes = (size: number, unit: FileSizeUnit): number => {
	switch (unit) {
		case FileSizeUnit.BYTES:
			return size;
		case FileSizeUnit.KILOBYTES:
			return size * 10 ** 3;
		case FileSizeUnit.MEGABYTES:
			return size * 10 ** 6;
		case FileSizeUnit.GIGABYTES:
			return size * 10 ** 9;
		default:
			return size;
	}
};
