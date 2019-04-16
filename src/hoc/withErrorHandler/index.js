import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal';
import Aux from '../Aux';

export default (WrappedComponent, axios) => {
	return (props) => {
		const [ error, setError ] = useState(null);

		useEffect(() => {
			const reqInterceptor = axios.interceptors.request.use((req) => {
				setError(null);
				return req; // return it don't block it
			});

			const resInterceptor = axios.interceptors.response.use(
				(res) => res, // return it don't block it
				(error) => {
					console.log(error);
					setError(error);
				}
			);

			return () => {
				console.log('Will Unmount', reqInterceptor, resInterceptor);

				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.request.eject(resInterceptor);
			};
		}, []);

		const errorConfirmedHandler = () => {
			setError(null);
		};
		return (
			<Aux>
				<Modal show={error} modalClosed={errorConfirmedHandler}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Aux>
		);
	};
};
