import React, { Fragment } from 'react'
import spinner from '../../img/96x96.gif'


export default () => (
	<Fragment>
		<img src={spinner} alt="Loading...." style={{ width: "96px", margin: "50px auto", display: "block"}} />
	</Fragment>
)
