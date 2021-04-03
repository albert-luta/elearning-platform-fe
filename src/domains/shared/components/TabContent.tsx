import { FC, memo } from 'react';

interface TabContentProps {
	value: any;
	selected: any;
}

export const TabContent: FC<TabContentProps> = memo(function TabContent({
	value,
	selected,
	children
}) {
	if (value !== selected) return null;

	return <>{children}</>;
});
