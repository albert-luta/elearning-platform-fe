import {
	ChangeEventHandler,
	Dispatch,
	DragEventHandler,
	FC,
	memo,
	useCallback,
	useMemo,
	useRef,
	useState
} from 'react';
import { AttachFile } from '@material-ui/icons';
import {
	Box,
	Button,
	Collapse,
	FormHelperText,
	FormLabel,
	Grid,
	Grow,
	Typography
} from '@material-ui/core';
import { FileSizeUnit } from '../../../constants/file/FileSizeUnit';
import { DragAndDropContainer } from './index.styles';
import { useSnackbar } from 'notistack';
import { convertToBytes } from 'domains/shared/utils/file/convertToBytes';
import { getFileExtension } from 'domains/shared/utils/file/getFileExtension';
import { FileButton } from '../../buttons/FileButton';
import { AdditionalInfo } from './AdditionalInfo';
import { FileType } from 'domains/shared/constants/file/FileType';
import { FileTypeExtensions } from 'domains/shared/constants/file/FileTypeExtensions';
import { getFileNameFromUrl } from 'domains/shared/utils/file/getFileNameFromUrl';

const preventDefault: DragEventHandler<HTMLDivElement> = (e) => {
	e.preventDefault();
};

export interface FileUploadProps {
	newFiles: Record<string, File>;
	onNewFilesUpdate: Dispatch<
		(prevState: Record<string, File>) => Record<string, File>
	>;
	label?: string;
	helperText?: string;
	maxFiles?: number;
	maxFileSize?: number;
	maxFileSizeUnit?: FileSizeUnit;
	acceptedFileTypes?: Exclude<FileType, FileType.UNKNOWN>[];
	errorMessage?: string;
	oldFiles?: string[];
	filesToDelete?: Record<string, true>;
	onFilesToDeleteUpdate?: Dispatch<
		(prevState: Record<string, true>) => Record<string, true>
	>;
}

export const FileUpload: FC<FileUploadProps> = memo(function FileUpload({
	newFiles,
	onNewFilesUpdate,
	label,
	helperText,
	maxFiles,
	maxFileSize,
	maxFileSizeUnit = FileSizeUnit.MEGABYTES,
	acceptedFileTypes,
	errorMessage,
	oldFiles = [],
	filesToDelete = {},
	onFilesToDeleteUpdate
}) {
	const remainingOldFilesArray = useMemo(
		() => oldFiles.filter((file) => !filesToDelete[file]),
		[oldFiles, filesToDelete]
	);
	const newFilesArray = useMemo(() => Object.values(newFiles), [newFiles]);
	const acceptedFileExtensions = useMemo(() => {
		if (!acceptedFileTypes) return;

		return acceptedFileTypes.reduce<Record<string, true>>((acc, type) => {
			return {
				...acc,
				...FileTypeExtensions[type]
			};
		}, {});
	}, [acceptedFileTypes]);

	const inputRef = useRef<HTMLInputElement>(null);
	const openSelectFilesDialog = useCallback((): void => {
		inputRef.current?.click();
	}, []);

	const [isDraggingOver, setIsDraggingOver] = useState(false);
	const enableIsDraggingOver: DragEventHandler<HTMLDivElement> = useCallback(
		(e) => {
			e.preventDefault();
			setIsDraggingOver(true);
		},
		[]
	);
	const disableIsDraggingOver: DragEventHandler<HTMLDivElement> = useCallback(
		(e) => {
			e.preventDefault();
			setIsDraggingOver(false);
		},
		[]
	);

	const snackbar = useSnackbar();
	const checkFiles = (filesReceived: FileList): void => {
		const selectedFiles = Array.from(filesReceived);
		// Check the maximum number of files permitted(if it exists)
		if (
			maxFiles != null &&
			Object.keys(newFiles).length + selectedFiles.length > maxFiles
		) {
			snackbar.enqueueSnackbar(
				`You can attach maximum ${maxFiles} file(s) in ${
					label ?? 'this'
				} field`,
				{
					variant: 'error'
				}
			);

			return;
		}

		// Check the extensions accepted
		if (acceptedFileExtensions != null) {
			const rejectedFileExtensions = Object.keys(
				selectedFiles.reduce((acc, curr) => {
					const ext = getFileExtension(curr);
					if (acceptedFileExtensions[ext]) {
						return acc;
					}

					return { ...acc, [ext]: true };
				}, {})
			);

			if (rejectedFileExtensions.length) {
				snackbar.enqueueSnackbar(
					`File extension(s) not accepted: ${rejectedFileExtensions.join(
						', '
					)}`,
					{ variant: 'error' }
				);

				return;
			}
		}

		// Check the files size
		if (maxFileSize != null) {
			for (const file of selectedFiles) {
				if (file.size > convertToBytes(maxFileSize, maxFileSizeUnit)) {
					snackbar.enqueueSnackbar(
						`Maximum file size accepted is ${maxFileSize} ${maxFileSizeUnit}`,
						{ variant: 'error' }
					);

					return;
				}
			}
		}

		onNewFilesUpdate((prevFiles) => ({
			...prevFiles,
			...selectedFiles.reduce<Record<string, File>>(
				(acc, curr) => ({ ...acc, [curr.name]: curr }),
				{}
			)
		}));
	};
	const checkSelectedFiles: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files == null) {
			return;
		}

		checkFiles(e.target.files);
	};
	const checkDroppedFiles: DragEventHandler<HTMLDivElement> = (e) => {
		disableIsDraggingOver(e);

		checkFiles(e.dataTransfer.files);
	};
	const removeNewFile = (file: File): void => {
		onNewFilesUpdate((prevFiles) => {
			const updatedFiles = { ...prevFiles };
			delete updatedFiles[file.name];
			return updatedFiles;
		});
		snackbar.enqueueSnackbar(`A file has been deleted: ${file.name}`, {
			action: function UndoRemoveFileSnackbar(key) {
				return (
					<Button
						onClick={() => {
							onNewFilesUpdate((prevFiles) => ({
								...prevFiles,
								[file.name]: file
							}));
							snackbar.closeSnackbar(key);
						}}
						color="primary"
					>
						Undo
					</Button>
				);
			}
		});
	};
	const removeOldFile = (file: string): void => {
		onFilesToDeleteUpdate?.((prevFiles) => ({
			...prevFiles,
			[file]: true
		}));
		snackbar.enqueueSnackbar(
			`A file has been deleted: ${getFileNameFromUrl(file)}`,
			{
				action: function UndoRemoveFileSnackbar(key) {
					return (
						<Button
							onClick={() => {
								onFilesToDeleteUpdate?.((prevFiles) => {
									const updatedFiles = { ...prevFiles };
									delete updatedFiles[file];
									return updatedFiles;
								});
								snackbar.closeSnackbar(key);
							}}
							color="primary"
						>
							Undo
						</Button>
					);
				}
			}
		);
	};

	const acceptedFileExtensionsArray =
		acceptedFileExtensions && Object.keys(acceptedFileExtensions);

	return (
		<Box pt={2}>
			{label && (
				<Box mb={0.5}>
					<FormLabel htmlFor="file-upload" error={!!errorMessage}>
						{label}
					</FormLabel>
				</Box>
			)}
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
			<input
				hidden
				id="file-upload"
				type="file"
				multiple
				ref={inputRef}
				accept={acceptedFileExtensionsArray?.join(',')}
				onChange={checkSelectedFiles}
			/>

			<Collapse in={maxFiles == null || newFilesArray.length < maxFiles}>
				<DragAndDropContainer
					onDragEnter={enableIsDraggingOver}
					onDragOver={preventDefault}
					onDragLeave={disableIsDraggingOver}
					onDrop={checkDroppedFiles}
					onClick={openSelectFilesDialog}
					isDraggingOver={isDraggingOver}
				>
					<Grid
						container
						justify="center"
						alignItems="center"
						style={{ height: '100%' }}
					>
						<Grid item>
							<Box mr={0.5} display="flex" alignItems="center">
								<AttachFile />
							</Box>
						</Grid>
						<Grid item>
							<Typography component="span">
								Click to add or drop files here
							</Typography>
						</Grid>
					</Grid>
				</DragAndDropContainer>
				<Box mt={0.5}>
					<AdditionalInfo
						filesArray={newFilesArray}
						maxFiles={maxFiles}
						maxFileSize={maxFileSize}
						maxFileSizeUnit={maxFileSizeUnit}
						acceptedFileExtensionsArray={
							acceptedFileExtensionsArray
						}
					/>
				</Box>
			</Collapse>
			<Collapse in={!!errorMessage}>
				<FormHelperText error>{errorMessage}</FormHelperText>
			</Collapse>

			{remainingOldFilesArray.length + newFilesArray.length > 0 && (
				<Box
					py={1}
					style={{
						overflowY: 'auto',
						maxHeight: 200
					}}
				>
					{remainingOldFilesArray.map((file, i) => (
						<Grow key={file + i} in>
							<Box mt={i && 1}>
								<FileButton
									file={file}
									onRemoveFile={removeOldFile}
								/>
							</Box>
						</Grow>
					))}
					{newFilesArray.map((file, i) => (
						<Grow key={file.name} in>
							<Box
								mt={
									!remainingOldFilesArray.length && i > 0
										? 1
										: 0
								}
							>
								<FileButton
									file={file}
									onRemoveFile={removeNewFile}
								/>
							</Box>
						</Grow>
					))}
				</Box>
			)}
		</Box>
	);
});
