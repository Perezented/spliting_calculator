import { Container } from "react-bootstrap";
import blurchart from "../images/blurchart.jpg"
import {
	ReactCompareSlider,
	ReactCompareSliderImage
} from "react-compare-slider";

export const CompareSlider = () => {
  return (
    <Container className="p-5">
				<div
        className="pb-5"
					style={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 1
					}}>
					<ReactCompareSlider
						boundsPadding={80}
            changePositionOnHover
						itemOne={
							<ReactCompareSliderImage
								alt="Image one"
								src={blurchart}
								style={{ filter: "blur(1rem) grayscale(1)" }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
								alt="Image two"
								src={blurchart}
                style={{ filter: "contrast(120%)" }}
							/>
						}
						position={50}
						style={{
							flexGrow: 1,
							width: "100%"
						}}
					/>
				</div>
			</Container>
  )
}