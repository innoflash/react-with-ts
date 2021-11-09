import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dialogActions, DialogConfigModel, DialogType } from '../../store/dialog.slice';
import Backdrop from './Backdrop/Backdrop';
import Card from './Card';

const Dialog: React.FC = () => {
	const dispatch = useDispatch();
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

	//check whether or not the cancel button must show.
	const showCancelButton = () => [DialogType.CONFIRM].includes(dialogConfig.type);

	//set button class name (color).
	const getButtonColor = () => `card-link btn btn-${ typeConfig[dialogConfig.type].btnColor } btn-xs`;

	//set footer content aligning.
	const getFooterStyles = () => `d-flex flex-row justify-content-${ showCancelButton() ? 'between' : 'center' }`;

	const closeDialog = () => dispatch(dialogActions.hideDialog());

	return <Backdrop>
		<Card>
			<p className="text-center">
				<img src={ dialogIcon }/>
			</p>
			<h6 className="card-subtitle mb-2 text-muted text-center">
				{ dialogConfig.title || typeConfig[dialogConfig.type].title }
			</h6>
			{ !!dialogConfig.message && <p className="text-center">{ dialogConfig.message }</p> }
			<div className={ getFooterStyles() }>
				{ showCancelButton() && <a href="#" className="btn btn-danger-outline btn-xs" onClick={ closeDialog }>
					{ dialogConfig.cancelButtonText || 'Close' }
				</a> }
				<a href="#" className={ getButtonColor() }>
					{ dialogConfig.okButtonText || 'Ok!' }
				</a>
			</div>
		</Card>
	</Backdrop>;
};

export default Dialog;