import React, { useState } from 'react';
import { DialogConfigModel, DialogType } from '../../store/dialog.slice';
import Backdrop from './Backdrop/Backdrop';
import Card from './Card';

const Dialog: React.FC = () => {
	const [dialogIcon, setDialogIcon] = useState<string>('');
	//const dialogConfig = useSelector((state: RootState) => state[DIALOG_SLICE]);
	const dialogConfig: DialogConfigModel = {
		type: DialogType.WARNING,
		message: 'This is my message here'
	};

	if (!dialogConfig)
		return (<span/>);

	const typeConfig: {
		[key: string]: {
			title: string,
			btnColor: string;
		}
	} = {
		[DialogType.SUCCESS]: {
			title: 'Success!',
			btnColor: 'success'
		},
		[DialogType.ERROR]: {
			title: 'Error!',
			btnColor: 'danger'
		},
		[DialogType.WARNING]: {
			title: 'Warning!',
			btnColor: 'warning'
		},
		[DialogType.CONFIRM]: {
			title: 'Are you sure?',
			btnColor: 'primary'
		}
	};

	//load image.
	import(`../../assets/img/dialogs/${ dialogConfig.type }-image.svg`)
		.then(res => setDialogIcon(res.default));

	//set button class name (color).
	const getButtonColor = () => `card-link btn btn-${ typeConfig[dialogConfig.type].btnColor } btn-xs`;

	return <Backdrop>
		<Card>
			<p className="text-center">
				<img src={ dialogIcon }/>
			</p>
			<h6 className="card-subtitle mb-2 text-muted text-center">
				{ dialogConfig.title || typeConfig[dialogConfig.type].title }
			</h6>
			{ !!dialogConfig.message && <p className="text-center">{ dialogConfig.message }</p> }
			<div className="d-flex flex-row justify-content-between">
				<a href="#" className="btn btn-danger-outline btn-xs">
					{ dialogConfig.cancelButtonText || 'Close' }
				</a>
				<a href="#" className={ getButtonColor() }>
					{ dialogConfig.okButtonText || 'Ok!' }
				</a>
			</div>
		</Card>
	</Backdrop>;
};

export default Dialog;