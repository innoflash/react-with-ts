import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Backdrop from './components/UI/Backdrop/Backdrop';
import Card from './components/UI/Card';
import Layout from './components/UI/Layout';
import NotFound from './Pages/NotFound';
import ServerResponse from './Pages/ServerResponse';
import UserInfo from './Pages/UserInfo';

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={ <UserInfo/> }/>
				<Route path="/server-response" element={ <ServerResponse/> }/>
				<Route path="*" element={ <NotFound/> }/>
			</Routes>
		</Layout>
	);
};

export default App;
