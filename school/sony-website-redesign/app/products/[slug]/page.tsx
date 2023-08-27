import Image from "next/image";
import Link from "next/link";
import { use } from "react";

import styles from "./ProductPage.module.scss";
import layoutStyles from "../../../styles/layout.module.scss";

import detailedProducts from "../../../lib/detailed-products.json";

async function getProduct(slug: string) {
	return detailedProducts.find((product) => product.slug === slug);
}

type ProductPageProps = {
	params?: any;
};

export default function Page({ params }: ProductPageProps) {
	const product = use(getProduct(params.slug));
	if (!product) return null;

	return (
		<div className={layoutStyles.main}>
			<div className={styles.backBar}>
				<Link className={styles.backButton} href="/products">
					{"<- Back"}
				</Link>
			</div>

			<div className={styles.mainContent}>
				<Image className={styles.image} alt={product.image.alt} src={`/products/${product.image.src}`} width={660} height={660} />

				<div className={styles.text}>
					<p>{product.name}</p>
					<h1>{product.marketingProductName}</h1>
					<p className={layoutStyles.price}>{product.price} CHF</p>

					<button>Kaufen</button>
				</div>
			</div>

			<div className={styles.categoryContainer}>
				<div className={styles.category}>
					<h2>Top Features</h2>
					<div className={styles.card}>
						<ul>
							{product.topFeatures.map((feature, index) => (
								<li key={`product.feature.${index}`}>{feature}</li>
							))}
						</ul>
					</div>
				</div>

				<div className={styles.category}>
					<h2>{product.specs[0].name}</h2>

					<div className={styles.card}>
						{product.specs[0].specs.map((spec, index) => (
							<div key={`product.spec.${index}`} className={styles.spec}>
								<p>{spec.displayName}</p>
								<p>{spec.value[0]}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
