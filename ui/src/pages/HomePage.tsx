import { DamageDealtChart } from "../components/DamageDealtChart";
import { Inventory } from "../components/Inventory";
import { KillsChart } from "../components/KillsChart";

export const HomePage = () => {
	return (
		<>
			<DamageDealtChart />
			<KillsChart />
			<Inventory />
		</>
	);
};
