import { FC, memo } from 'react';
import { FileType } from '../../constants/file/FileType';
import { getFileType } from '../../utils/file/getFileType';
import { AiFillFileUnknown } from 'react-icons/ai';
import {
	FaFileAlt,
	FaFileArchive,
	FaFileAudio,
	FaFileCode,
	FaFileCsv,
	FaFileImage,
	FaFilePdf,
	FaFileVideo,
	FaFileWord
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

const Icons: Record<FileType, IconType> = {
	[FileType.WORD]: FaFileWord,
	[FileType.PDF]: FaFilePdf,
	[FileType.ARCHIVE]: FaFileArchive,
	[FileType.TEXT]: FaFileAlt,
	[FileType.IMAGE]: FaFileImage,
	[FileType.VIDEO]: FaFileVideo,
	[FileType.AUDIO]: FaFileAudio,
	[FileType.CSV]: FaFileCsv,
	[FileType.CODE]: FaFileCode,
	[FileType.UNKNOWN]: AiFillFileUnknown
};

interface FileIconProps {
	file: File | string;
}

export const FileIcon: FC<FileIconProps> = memo(function FileIcon({ file }) {
	const type = getFileType(file);
	const ComputedIcon = Icons[type];

	return (
		<>
			<ComputedIcon fontSize="1.5rem" />
		</>
	);
});
