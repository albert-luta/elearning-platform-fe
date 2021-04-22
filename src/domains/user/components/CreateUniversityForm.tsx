import { FileUpload } from 'domains/shared/components/form/FileUpload';
import { FileType } from 'domains/shared/constants/file/FileType';
import { FC, memo, useState } from 'react';

interface CreateUniversityFormProps {
	exampleProp?: any;
}

export const CreateUniversityForm: FC<CreateUniversityFormProps> = memo(
	function CreateUniversityForm() {
		const [files, setFiles] = useState<Record<string, File>>({});

		return (
			<>
				<FileUpload
					files={files}
					onChange={setFiles}
					maxFiles={2}
					maxFileSize={10}
					acceptedFileTypes={[
						FileType.WORD,
						FileType.PDF,
						FileType.ARCHIVE
					]}
				/>
			</>
		);
	}
);
