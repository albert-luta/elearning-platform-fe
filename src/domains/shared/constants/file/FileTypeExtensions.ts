import { FileType } from './FileType';

export const FileTypeExtensions: Record<FileType, Record<string, true>> = {
	[FileType.WORD]: {
		'.doc': true,
		'.docx': true
	},
	[FileType.PDF]: {
		'.pdf': true
	},
	[FileType.ARCHIVE]: {
		'.zip': true,
		'.rar': true,
		'.7z': true,
		'.tar': true
	},
	[FileType.TEXT]: { '.txt': true },
	[FileType.IMAGE]: {
		'.jpg': true,
		'.jpeg': true,
		'.gif': true,
		'.png': true,
		'.tiff': true,
		'.bmp': true
	},
	[FileType.VIDEO]: {
		'.mp4': true,
		'.mov': true,
		'.wmv': true,
		'.flv': true,
		'.avi': true
	},
	[FileType.AUDIO]: { '.wav': true, '.mp3': true },
	[FileType.CSV]: { '.csv': true },
	[FileType.CODE]: {
		'.py': true,
		'.class': true,
		'.java': true,
		'.kt': true,
		'.css': true,
		'.less': true,
		'.sass': true,
		'.scss': true,
		'.html': true,
		'.xhtml': true,
		'.js': true,
		'.jsx': true,
		'.ts': true,
		'.tsx': true,
		'.php': true,
		'.rb': true,
		'.c': true,
		'.cpp': true,
		'.go': true,
		'.csharp': true,
		'.swift': true
	},
	[FileType.UNKNOWN]: {}
};
