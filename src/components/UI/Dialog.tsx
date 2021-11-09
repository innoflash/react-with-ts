import React, { useState } from 'react';
import { DialogConfigModel, DialogType } from '../../store/dialog.slice';
import Backdrop from './Backdrop/Backdrop';
import Card from './Card';

const Dialog: React.FC = () => {
	const [dialogIcon, setDialogIcon] = useState<string>('');
	//const dialogConfig = useSelector((state: RootState) => state[DIALOG_SLICE]);
	const dialogConfig: DialogConfigModel = {
		type: DialogType.CONFIRM,
		message: 'This is my message here'
	};

	if (!dialogConfig)
		return (<span/>);

	const typeConfig: {
		[key: string]: {
			title: string
		}
	} = {
		[DialogType.SUCCESS]: {
			title: 'Success!'
		},
		[DialogType.ERROR]: {
			title: 'Error!'
		},
		[DialogType.WARNING]: {
			title: 'Warning!'
		},
		[DialogType.CONFIRM]: {
			title: 'Are you sure?'
		}
	};

	//load image.
	import(`../../assets/img/dialogs/${ dialogConfig.type }-image.svg`)
		.then(res => setDialogIcon(res.default));

	return <Backdrop>
		<Card>
			<p className="text-center">
				<img src={ dialogIcon }/>
			</p>
			<h6 className="card-subtitle mb-2 text-muted text-center">
				{ dialogConfig.title || typeConfig[dialogConfig.type].title }
			</h6>
			{ !!dialogConfig.message && <p className="text-center">{ dialogConfig.message }</p> }
		</Card>
	</Backdrop>;
};

export default Dialog;