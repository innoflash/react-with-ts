import React from 'react';
import useAuthGuard from '../hooks/useAuthGuard';

const ServerResponse: React.FC = () => {
	const identityData = useAuthGuard();

	return (
		<div className="row">
			<div className="col-sm-12 col-md-12 col-lg-12">
				<div className="inner_forms">
					<div className="pera_01">
						<h4>Congratulations!</h4>
						<p>Your FREE NESCAFÉ ICED COFFEE is ready!</p>
					</div>
					<div className="pera_02">
						<h4>Get your ICED COFFEE</h4>
						<p>Use the QR code to collect your free sample. <br/> Enjoy your FREE NESCAFÉ ICED COFFEE!</p>
						<p>ou can find our vending machine in the food court <br/> in Eastgate Shopping mall.</p>
					</div>
					<div className="qr_codes">
						<img src="img/Qr_code.jpeg"/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServerResponse;