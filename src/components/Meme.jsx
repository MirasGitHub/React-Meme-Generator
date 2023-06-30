import { Form, FormGroup, Input } from "reactstrap";
import getMemeButton from "../assets/Get a new meme image 🖼.png";

import { useEffect, useState } from "react";

const Meme = () => {
	const [meme, setMeme] = useState({
		topText: "",
		bottomText: "",
		randomImage: "http://i.imgflip.com/1bij.jpg",
	});

	const [allMemes, setAllMemes] = useState([]);

	useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => res.json())
			.then((data) => setAllMemes(data.data.memes));
	}, []);

	const randomIndex = Math.floor(Math.random() * allMemes.length);

	const getMemeImage = (e) => {
		e.preventDefault();
		const url = allMemes[randomIndex].url;
		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: url,
		}));
	};

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value,
		}));
	};

	return (
		<div>
			<main>
				<Form className="form">
					<div className="form__inputs">
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<Input
								type="text"
								name="topText"
								id="topText"
								value={meme.topText}
								placeholder="top text"
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<Input
								type="text"
								name="bottomText"
								id="bottomText"
								value={meme.bottomText}
								placeholder="bottom text"
								onChange={handleChange}
							/>
						</FormGroup>
					</div>
					<div className="form__btn">
						<button onClick={getMemeImage} className="btn btn--generator">
							<img src={getMemeButton} alt="getMeme" />
						</button>
					</div>
				</Form>
				<br />
				<div className="meme">
					<img className="meme--image" src={meme.randomImage} alt="random" />
					<h2 className="meme--text top">{meme.topText}</h2>
					<h2 className="meme--text bottom">{meme.bottomText}</h2>
				</div>

				<br />
			</main>
		</div>
	);
};

export default Meme;
