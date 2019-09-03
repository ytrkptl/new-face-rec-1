import React from 'react';
import './Footer.css';

const Footer = () => {
	return(
		<footer className="FooterClass">
			<div className="FooterCol1">
				<a className="FooterLinkStyle" href="/">Credits</a>
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
			</div>
			<div className="FooterCol2">
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
			</div>
			<div className="FooterCol3">
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
				<a className="FooterLinkStyle" href="/">Link</a>
			</div>
		</footer>
	)
}

export default Footer;