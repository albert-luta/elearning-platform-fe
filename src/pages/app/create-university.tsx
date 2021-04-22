import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { CreateUniversityForm } from 'domains/user/components/CreateUniversityForm';

export default function CreateUniversity() {
	return (
		<>
			<ContentHeader title="Create University" />
			<CreateUniversityForm />
		</>
	);
}
