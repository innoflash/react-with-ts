import React from 'react';
import emailImage from '../../assets/img/email.png';
import phoneImage from '../../assets/img/phone_number.png';
import userNameImage from '../../assets/img/username.png';
import { getArrayUniqueValues } from '../../helper';
import { LocationModel } from '../../models/LocationModel';
import ItemLoader from '../Loaders/ItemLoader/ItemLoader';

const UserCredentials: React.FC<{
	isLoading: boolean;
	locations: LocationModel[];
}> = ({ isLoading, locations }) => {
	const ages = Array(100)
		.fill(0)
		.map((_, i) => i + 1)
		.filter(num => num >= 18)
		.map(num => `${ num } years`);

	const provinces = locations.map(location => location.province)
		.filter(getArrayUniqueValues);

	const getLocations = (province: string) => locations.filter(location => location.province === province);

	return (
		<form>
			<div className="form-group in_desg">
				<img src={ userNameImage } className="name_f"/>
				<input type="text" className="form-control" placeholder="Full Name" id="full_name"/>
			</div>
			<div className="form-group in_desg">
				<img src={ emailImage } className="emails"/>
				<input type="email" className="form-control" placeholder="Email" id="email"/>
			</div>
			<div className="form-group in_desg">
				<img src={ phoneImage } className="phones"/>
				<input type="text" className="form-control" placeholder="Phone Number" id="email"/>
			</div>
			<div className="form-group inline_boxs">
				<label htmlFor="sel1">Age</label>
				<select className="form-control">
					{ ages.map(age => (
						<option key={ `key_${ age }` } value={ age }>
							{ age }
						</option>
					)) }
				</select>
			</div>
			<div className="form-group inline_boxs">
				<label htmlFor="sel1">Opt in</label>
				<select className="form-control">
					<option value="" selected disabled>Choose opt in</option>
					<option>Yes</option>
					<option>No</option>
				</select>
			</div>
			<div className="form-group">
				<label htmlFor="sel1">Preferred Communication</label>
				<select className="form-control">
					<option value="" selected disabled>Choose method</option>
					<option>Email</option>
					<option>SMS</option>
				</select>
			</div>
			<ItemLoader isLoading={ isLoading }>
				<div className="form-group inline_boxs">
					<label htmlFor="sel1">Location</label>
					<select className="form-control">
						<option value="" selected disabled>Choose location</option>
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
					enjoy your FREE NESCAFÉ ICED COFFEE!</h4>
			</div>
		</form>
	);
};

export default UserCredentials;