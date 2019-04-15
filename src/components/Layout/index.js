import React from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar';

export default ({children}) => {
	return (
		<Aux>
			<Toolbar />
			<main>{children} </main>
		</Aux>
	);
};

