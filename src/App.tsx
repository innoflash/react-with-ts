import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './Pages/NotFound';
import ServerResponse from './Pages/ServerResponse';
import UserInfo from './Pages/UserInfo';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={ <UserInfo/> }/>
			<Route path="/server-response" element={ <ServerResponse/> }/>
			<Route path="*" element={ <NotFound/> }/>
		</Routes>
	);
};

export default App;
