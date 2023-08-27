"use client";

import classNames from "classnames";
import { useState } from "react";
import Image from "next/image";

import styles from "./Images.module.scss";
import layoutStyles from "../../styles/layout.module.scss";

import { useScreenSize } from "../../lib/context/ScreenSizeProvider";

import { Slider } from "../../components/Slider/Slider";
import Footer from "../../components/Footer/Footer";

import bike from "../../public/assets/images/bike.jpg";
import city from "../../public/assets/images/city.jpg";
import clouds from "../../public/assets/images/clouds.jpg";
import highways from "../../public/assets/images/highways.jpg";
import landscape from "../../public/assets/images/landscape.jpg";
import matterhorn from "../../public/assets/images/matterhorn.jpg";
import rocks from "../../public/assets/images/rocks.jpg";
import skyscrapers from "../../public/assets/images/skyscrapers.jpg";

const images = [
	{
		title: "Bike",
		src: bike,
	},
	{
		title: "City",
		src: city,
	},
	{
		title: "Clouds",
		src: clouds,
	},
	{
		title: "Highways",
		src: highways,
	},
	{
		title: "Landscape",
		src: landscape,
	},
	{
		title: "Matterhorn",
		src: matterhorn,
	},
	{
		title: "Rocks",
		src: rocks,
	},
	{
		title: "Skyscrapers",
		src: skyscrapers,
	},
];

import blueCart from "../../public/assets/moreImages/blue-cart.jpg";
import blueNight from "../../public/assets/moreImages/blue-night.jpg";
import bridgeHouse from "../../public/assets/moreImages/bridge-house.jpg";
import bridge from "../../public/assets/moreImages/bridge.jpg";
import crane from "../../public/assets/moreImages/crane.jpg";
import crossRoad from "../../public/assets/moreImages/cross-road.jpg";
import empireFog from "../../public/assets/moreImages/empire-fog.jpg";
import empireState from "../../public/assets/moreImages/empire-state.jpg";
import fastCar from "../../public/assets/moreImages/fast-car.jpg";
import futuristic from "../../public/assets/moreImages/futuristic.jpg";
import redSign from "../../public/assets/moreImages/red-sign.jpg";
import station from "../../public/assets/moreImages/station.jpg";
import tallBuilding from "../../public/assets/moreImages/tall-building.jpg";

const moreImages = [
	{
		title: "Blue Cart",
		src: blueCart,
	},
	{
		title: "Blue Night",
		src: blueNight,
	},
	{
		title: "Bridge House",
		src: bridgeHouse,
	},
	{
		title: "Bridge",
		src: bridge,
	},
	{
		title: "Crane",
		src: crane,
	},
	{
		title: "Cross Road",
		src: crossRoad,
	},
	{
		title: "Empire Fog",
		src: empireFog,
	},
	{
		title: "Empire State",
		src: empireState,
	},
	{
		title: "Fast Car",
		src: fastCar,
	},
	{
		title: "Futuristic",
		src: futuristic,
	},
	{
		title: "Red Sign",
		src: redSign,
	},
	{
		title: "Station",
		src: station,
	},
	{
		title: "Tall Building",
		src: tallBuilding,
	},
];

export default function Page() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const { mobile } = useScreenSize();

	const wideImagesIndexes = moreImages.map((_, index) => index).filter((index) => index % 14 === 0 || (index + 5) % 14 === 0);

	const determineImageWidth = (index: number): string[] =>
		!mobile && wideImagesIndexes.includes(index) ? [styles.moreImage, styles.wide] : [styles.moreImage];

	return (
		<div className={layoutStyles.main}>
			<h1>Images</h1>

			<div className={styles.sliderWrapper}>
				<Slider selectedIndexUpdate={setSelectedIndex} items={images} slideClassName={[styles.slide]} contentClassName={styles.container}>
					<Image className={styles.sliderImage} src={images[selectedIndex].src} alt={images[selectedIndex].title} fill placeholder="blur" />
					<div className={styles.contentWrapper}>
						<div className={styles.content}>
							<h2>{images[selectedIndex].title}</h2>
						</div>
					</div>
				</Slider>
			</div>

			<h2>More images!</h2>

			<div className={styles.moreImagesContainer}>
				{moreImages.map((image, index) => (
					<Image
						className={classNames(determineImageWidth(index), { [styles.mobileImage]: mobile })}
						src={image.src}
						alt={image.title}
						key={`images.${index}`}
						placeholder="blur"
					/>
				))}
			</div>

			<Footer />
		</div>
	);
}
