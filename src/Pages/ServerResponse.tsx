import React from 'react';
import useAuthGuard from '../hooks/useAuthGuard';

const ServerResponse: React.FC = () => {
	useAuthGuard();
	return (
		<p>This is server response</p>
	);
};

export default ServerResponse;