import { DamageDealtChart } from "../components/DamageDealtChart";
import { Inventory } from "../components/Inventory";
import { KillsChart } from "../components/KillsChart";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
	return (
		<>
			<div class={styles.container}>
				<div class={styles.col}>
					<DamageDealtChart />
					<KillsChart />
				</div>

				<div class={styles.col}>
					<Inventory />
				</div>
			</div>
		</>
	);
};
