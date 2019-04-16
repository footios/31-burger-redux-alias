import React, { useState } from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer';

export default ({children}) => {

	const [showSideDrawer, setShowSideDrawer] = useState(true)

	const sideDrawerHandler = () => {
		setShowSideDrawer(false)
	}
	return (
		<Aux>
			<Toolbar />
			<Sidedrawer open={showSideDrawer} closed={sideDrawerHandler} />
			<main>{children} </main>
		</Aux>
	);
};

