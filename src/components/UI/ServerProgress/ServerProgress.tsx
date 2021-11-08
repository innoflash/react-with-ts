import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SERVER_PROGRESS_SLICE, ServerProgressType } from '../../../store/server-progress.slice';
import classes from './ServerProgress.module.css';

const ServerProgress: React.FC = () => {
	const serverProgress = useSelector((state: RootState) => state[SERVER_PROGRESS_SLICE]);

	if (!serverProgress) {
		return (<span/>);
	}

	const bgMap = {
		[ServerProgressType.SUCCESS]: 'bg-success',
		[ServerProgressType.ERROR]: 'bg-danger',
		[ServerProgressType.PENDING]: 'bg-info'
	};

	return (
		<div className={ classes['server-progress'] }>
			<p className={ bgMap[serverProgress?.type] }>
				{ serverProgress.message }
			</p>
		</div>
	);
};

export default ServerProgress;