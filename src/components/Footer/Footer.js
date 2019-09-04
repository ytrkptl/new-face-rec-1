import React from 'react';
import './Footer.css';

const Footer = () => {
	return(
		<footer className="FooterClass">
			<h3 className="FooterTitle" >Credits/Links</h3>
			<div className="FooterGrid">
					<a className="FooterLinkStyle" href="http://clipart-library.com/clipart/114791.htm">Thunderstorm Logo</a>
					<a className="FooterLinkStyle" href="/">My Portfolio</a>
					<a className="FooterLinkStyle" href="/">GitHub</a>
					<a className="FooterLinkStyle" href="/">LinkedIn</a>
			</div>
			<hr/>
			<p className="FooterAuthor" >Created by: Yatrik Patel, September 4, 2019</p>
		</footer>
	)
}

export default Footer;