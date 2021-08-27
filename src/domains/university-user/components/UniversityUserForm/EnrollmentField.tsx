import {
	Box,
	Button,
	InputLabel,
	Dialog,
	Tooltip,
	IconButton,
	FormControl,
	Select,
	Input,
	Chip,
	MenuItem
} from '@material-ui/core';
import { DataGrid, GridColDef, GridRowId } from '@material-ui/data-grid';
import { Clear } from '@material-ui/icons';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { FieldArray } from 'formik';
import { CollegeFieldsFragment } from 'generated/graphql';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { CollegeToEnrollAt } from './UniversityUserForm';

const collegesDataGridColumns: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 1
	}
];

interface EnrollmentFieldProps {
	name: string;
	colleges: CollegeFieldsFragment[];
	collegesToEnrollAt: CollegeToEnrollAt[];
	onPickColleges: (colleges: CollegeToEnrollAt[]) => void;
}

export const EnrollmentField: FC<EnrollmentFieldProps> = memo(
	function EnrollmentField({
		name,
		colleges,
		collegesToEnrollAt,
		onPickColleges
	}) {
		const [
			isAddCollegesDialogOpen,
			openAddCollegesDialog,
			closeAddCollegesDialog
		] = useBooleanState();

		const collegesToEnrollAtMap = useMemo(
			() =>
				collegesToEnrollAt.reduce<Record<string, true>>(
					(acc, curr) => ({
						...acc,
						[curr.id]: true
					}),
					{}
				),
			[collegesToEnrollAt]
		);
		const collegeRows = useMemo(
			() => colleges.filter(({ id }) => !collegesToEnrollAtMap[id]),
			[collegesToEnrollAtMap, colleges]
		);

		const [collegesSelectionModel, setCollegesSelectionModel] = useState<
			GridRowId[]
		>([]);
		useEffect(() => {
			if (!isAddCollegesDialogOpen) {
				setCollegesSelectionModel([]);
			}
		}, [isAddCollegesDialogOpen]);

		const collegesMap = useMemo(
			() =>
				colleges.reduce<Record<string, CollegeFieldsFragment>>(
					(acc, curr) => ({
						...acc,
						[curr.id]: curr
					}),
					{}
				),
			[colleges]
		);
		const addColleges = useCallback((): void => {
			onPickColleges([
				...collegesToEnrollAt,
				...collegesSelectionModel.map((id) => ({
					id: String(id),
					name: collegesMap[id].name,
					coursesToEnrollAt: []
				}))
			]);
			closeAddCollegesDialog();
		}, [
			onPickColleges,
			collegesToEnrollAt,
			collegesSelectionModel,
			collegesMap,
			closeAddCollegesDialog
		]);

		const coursesMap = useMemo(
			() =>
				colleges.reduce<
					Record<string, CollegeFieldsFragment['courses'][number]>
				>(
					(collegesAcc, college) => ({
						...collegesAcc,
						...college.courses.reduce<
							Record<
								string,
								CollegeFieldsFragment['courses'][number]
							>
						>(
							(coursesAcc, course) => ({
								...coursesAcc,
								[course.id]: course
							}),
							{}
						)
					}),
					{}
				),
			[colleges]
		);

		return (
			<>
				<FieldArray
					name={name}
					render={({ remove, replace }) => (
						<>
							{collegesToEnrollAt.map((college, i) => (
								<Box key={college.id} mt={i && 1}>
									<Box
										display="flex"
										justifyContent="space-between"
										alignItems="center"
									>
										<InputLabel>{college.name}</InputLabel>
										<Tooltip title="Remove from College">
											<IconButton
												onClick={() => remove(i)}
											>
												<Clear fontSize="small" />
											</IconButton>
										</Tooltip>
									</Box>
									<FormControl>
										<InputLabel id="enrolled-courses-label">
											Courses
										</InputLabel>
										<Select
											labelId="enrolled-courses-label"
											id="enrolled-courses"
											autoWidth
											multiple
											style={{ minWidth: 125 }}
											value={college.coursesToEnrollAt.map(
												({ id }) => id
											)}
											onChange={(e) => {
												replace(i, {
													...college,
													coursesToEnrollAt: (e.target
														.value as string[]).map(
														(id) => ({
															id,
															name:
																coursesMap[id]
																	.name
														})
													)
												});
											}}
											input={
												<Input id="select-multiple-courses" />
											}
											renderValue={(selected) => (
												<>
													{(selected as string[]).map(
														(id) => (
															<Box m={1} key={id}>
																<Chip
																	label={
																		coursesMap[
																			id
																		].name
																	}
																/>
															</Box>
														)
													)}
												</>
											)}
										>
											{collegesMap[
												college.id
											].courses.map((course) => (
												<MenuItem
													key={course.id}
													value={course.id}
												>
													{course.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Box>
							))}
						</>
					)}
				/>
				<Box mt={2}>
					<Button fullWidth onClick={openAddCollegesDialog}>
						+ Enroll at colleges
					</Button>
				</Box>

				<Dialog
					open={isAddCollegesDialogOpen}
					onClose={closeAddCollegesDialog}
					fullWidth
					maxWidth="sm"
				>
					<Content>
						<ContentHeader title="Colleges" />
						<DataGrid
							columns={collegesDataGridColumns}
							rows={collegeRows}
							autoHeight
							checkboxSelection
							disableSelectionOnClick
							autoPageSize
							selectionModel={collegesSelectionModel}
							onSelectionModelChange={setCollegesSelectionModel}
						/>
						<Box mt={3}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								onClick={addColleges}
							>
								Add
							</Button>
						</Box>
					</Content>
				</Dialog>
			</>
		);
	}
);
