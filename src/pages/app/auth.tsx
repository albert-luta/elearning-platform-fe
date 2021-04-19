import { useCallback, useState } from 'react';
import { MyHead } from 'domains/shared/components/MyHead';
import { AppBar, Box, Container, Paper, Tab, Tabs } from '@material-ui/core';
import { TabContent } from 'domains/shared/components/TabContent';
import { LoginForm } from 'domains/auth/components/LoginForm';
import { RegisterForm } from 'domains/auth/components/RegisterForm';
import { Content } from 'domains/shared/components/layout/Content';

enum AuthTabs {
	LOGIN,
	REGISTER
}

export default function Auth() {
	const [selectedTab, setSelectedTab] = useState(AuthTabs.LOGIN);
	const handleTabChange = useCallback((_, tab: AuthTabs) => {
		setSelectedTab(tab);
	}, []);

	return (
		<>
			<MyHead title="Authentication" />

			<Container maxWidth="xs">
				<Box mt="20vh">
					<Paper square>
						<AppBar position="static" color="default">
							<Tabs
								indicatorColor="primary"
								value={selectedTab}
								onChange={handleTabChange}
								variant="fullWidth"
							>
								<Tab value={AuthTabs.LOGIN} label="Login" />
								<Tab
									value={AuthTabs.REGISTER}
									label="Register"
								/>
							</Tabs>
						</AppBar>

						<Box maxHeight="calc(75vh - 50px)" overflow="auto">
							<Content>
								<TabContent
									value={AuthTabs.LOGIN}
									selected={selectedTab}
								>
									<LoginForm />
								</TabContent>
								<TabContent
									value={AuthTabs.REGISTER}
									selected={selectedTab}
								>
									<RegisterForm />
								</TabContent>
							</Content>
						</Box>
					</Paper>
				</Box>
			</Container>
		</>
	);
}
