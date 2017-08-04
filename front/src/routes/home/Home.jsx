import React, { Component } from 'react';

import './Home.css';

export default class Home extends Component {
	render() {
		return (
			<div className='Home'>
				<h1>Front end : ReactJS</h1>
				<h2>Drop a File</h2>
				<ul>
					<li>Test extension (csv or xml)</li>
					<li>Test size </li>
					<li>Calculate MD5</li>
					<li>Send http request to back with md5 + size</li>
					<li>if find -> return result file</li>
					<li>if not send File</li>
				</ul>

				<h2>Show Result</h2>


				<h1>Backend: Django</h1>
				<p>
					<p>
						GET findFile(md5, size)<br/>
						200: file / url : Url to the result file<br/>
						404: no file<br/>
						Return the file with the corresponding md5<br/>
					</p>
					<p>
						POST calculateFile(file)  / ! \ Test extension and size / ! \<br/>
						200: file / url : Url to the result file<br/>
						else: error<br/>
						Save the ‘in’ file in GCS at BUCKET/md5/in.xxx<br/>
						Process the file (can be long)<br/>
						Save the out file in GCS at BUCKET/md5/out.xxx<br/>
					</p>
				</p>

				<h1>Appengin: </h1>
				<ul>
					<li>HostFrontend</li>
					<li>Host Backend</li>
				</ul>

				<h1>Bonus: </h1>
				Stock IP, md5, date, country in DB


			</div>
		)
	}
}
