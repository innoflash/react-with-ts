import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import emailImage from '../../assets/img/email.png';
import phoneImage from '../../assets/img/phone_number.png';
import userNameImage from '../../assets/img/username.png';
import { getArrayUniqueValues } from '../../helper';
import useInput from '../../hooks/useInput';
import { LocationModel } from '../../models/LocationModel';
import { dialogActions } from '../../store/dialog.slice';
import ItemLoader from '../Loaders/ItemLoader/ItemLoader';

export type UserCredentialsProps = {
	isLoading: boolean;
	locations: LocationModel[];
	onFormSubmit: (data: { [key: string]: string | number }) => void;
};
// eslint-disable-next-line react/display-name
const UserCredentials = forwardRef<HTMLButtonElement, UserCredentialsProps>((x, ref) => {
	const dispatch = useDispatch();

	const ages = Array(100)
		.fill(0)
		.map((_, i) => i + 1)
		.filter(num => num >= 18)
		.map(num => `${ num } years`);

	const provinces = x.locations.map(location => location.province).filter(getArrayUniqueValues);

	const getLocations = (province: string) => x.locations.filter(location => location.province === province);

	// configure inputs.
	const nameInput = useInput(val => !!val.trim().length);
	const emailInput = useInput(val => val.trim().includes('@'));
	const phoneInput = useInput(val => val.trim().length >= 10);
	const ageInput = useInput(val => !!val.trim().length);
	const optInInput = useInput(val => ['Yes', 'No'].includes(val));
	const communicationInput = useInput(val => ['Email', 'SMS'].includes(val));
	const locationInput = useInput(val => x.locations.map(location => location.id).includes(parseInt(val)));

	// handle form submission.
	const formSubmissionHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const isFormInvalid = [
			nameInput.valid,
			emailInput.valid,
			phoneInput.valid,
			ageInput.valid,
			optInInput.valid,
			communicationInput.valid,
			locationInput.valid
		].some(valid => !valid);

		if (isFormInvalid) {
			dispatch(dialogActions.showErrorDialog({
				title: 'Invalid data',
				message: 'Please fill in all required fields with valid data.'
			}));
			return;
		}

		//submit data with parent component.
		x.onFormSubmit({
			name: nameInput.value,
			email: emailInput.value,
			phone: phoneInput.value,
			age: ageInput.value,
			communication: communicationInput.value,
			opt_in: optInInput.value,
			location_id: locationInput.value,
		});
	};

	return (
		<form onSubmit={ formSubmissionHandler }>
			{ nameInput.hasError && <small className="text-danger">The name is invalid</small> }
			<div className="form-group in_desg">
				<img src={ userNameImage } className="name_f"/>
				<input type="text"
				       className="form-control"
				       placeholder="Full Name"
				       id="full_name"
				       value={ nameInput.value }
				       onChange={ nameInput.onChange }
				       onBlur={ nameInput.onBlur }/>
			</div>

			{ emailInput.hasError && <small className="text-danger">The email is invalid</small> }
			<div className="form-group in_desg">
				<img src={ emailImage } className="emails"/>
				<input type="email"
				       className="form-control"
				       placeholder="Email"
				       id="email"
				       value={ emailInput.value }
				       onChange={ emailInput.onChange }
				       onBlur={ emailInput.onBlur }/>
			</div>

			{ phoneInput.hasError && <small className="text-danger">The phone is invalid</small> }
			<div className="form-group in_desg">
				<img src={ phoneImage } className="phones"/>
				<input type="text"
				       className="form-control"
				       placeholder="Phone Number"
				       id="phone"
				       value={ phoneInput.value }
				       onChange={ phoneInput.onChange }
				       onBlur={ phoneInput.onBlur }/>
			</div>

			{ ageInput.hasError && <small className="text-danger">The age is invalid, select the right one</small> }
			<div className="form-group inline_boxs">
				<label htmlFor="sel1">Age</label>
				<select className="form-control"
				        value={ ageInput.value }
				        onChange={ ageInput.onChange }
				        onBlur={ ageInput.onBlur }>
					<option value="" disabled>Choose opt in</option>
					{ ages.map(age => (
						<option key={ `key_${ age }` } value={ age }>
							{ age }
						</option>
					)) }
				</select>
			</div>

			{ optInInput.hasError &&
			<small className="text-danger">The opt-in is invalid, select the right one</small> }
			<div className="form-group inline_boxs">
				<label htmlFor="sel1">Opt in</label>
				<select className="form-control"
				        value={ optInInput.value }
				        onChange={ optInInput.onChange }
				        onBlur={ optInInput.onBlur }>
					<option value="" disabled>Choose opt in</option>
					<option>Yes</option>
					<option>No</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="sel1">Preferred Communication</label>
				{ communicationInput.hasError &&
				<small className="text-danger">The preferred communication is invalid, select the right one</small> }
				<select className="form-control"
				        value={ communicationInput.value }
				        onChange={ communicationInput.onChange }
				        onBlur={ communicationInput.onBlur }>
					<option value="" disabled>Choose method</option>
					<option>Email</option>
					<option>SMS</option>
				</select>
			</div>

			<ItemLoader isLoading={ x.isLoading }>
				{ locationInput.hasError &&
				<small className="text-danger">The location is invalid, select the right one</small> }
				<div className="form-group inline_boxs">
					<label htmlFor="sel1">Location</label>
					<select className="form-control"
					        value={ locationInput.value }
					        onChange={ locationInput.onChange }
					        onBlur={ locationInput.onBlur }>
						<option value="" disabled>Choose location</option>
						{ provinces.map(province => (
							<optgroup label={ province } key={ province }>
								{ getLocations(province).map(location => (
									<option key={ location.id } value={ location.id }>
										{ location.name }
									</option>
								)) }
							</optgroup>
						)) }
					</select>
				</div>
			</ItemLoader>
			<div className="pains">
				<h4 className="middle_title">
					Lastly, share this cracking ice post to Facebook or <br/> Instagram and
					enjoy your FREE NESCAFÉ ICED COFFEE!
				</h4>
			</div>
			<button ref={ ref } type="submit" style={ { display: 'none' } }/>
		</form>
	);
});

export default UserCredentials;