"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";

import { useScreenSize } from "../../lib/context/ScreenSizeProvider";

import { ProductType } from "../../types/Product";

import styles from "./ProductCard.module.scss";
import layoutStyles from "../../styles/layout.module.scss";

type ProductCardProps = {
	product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
	const { mobile } = useScreenSize();
	const router = useRouter();

	useEffect(() => {
		router.prefetch(`/products/${product.slug}`);
	}, []);

	return (
		<motion.div
			onClick={() => router.push(`/products/${product.slug}`)}
			className={classNames(styles.productCard, { [styles.mobile]: mobile })}
			initial={{ scale: 1 }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<Image alt={product.image.alt} src={`/products/${product.image.src}`} width={660} height={660} className={styles.image} />

			<div className={styles.textContainer}>
				<p>{product.name}</p>
				<p>{product.marketingProductName}</p>

				<p className={layoutStyles.price}>{product.price} CHF</p>
			</div>
		</motion.div>
	);
}
